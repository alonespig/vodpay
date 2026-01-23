<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>供应商商品列表</span>
          <el-button type="primary" @click="buttonClick">添加供应商产品</el-button>
        </div>
      </template>
      <SupplierTable :tableData="tableData" @submit-edit="editSupplierProduct" />
    </el-card>
    <AddSupplierDialog
      v-model:visible="dialogAdd"
      :sku-list="skuList"
      :brand-list="brandList"
      :spec-list="specList"
      :supplier-list="supplierList"
      @submit="addSupplierProduct"
    />
  </div>
</template>

<script setup>
import SupplierTable from "@/components/Supplier/SupplierTable.vue";
import AddSupplierDialog from "@/components/Supplier/AddSupplierDialog.vue";
import { ref, onMounted } from "vue";
import {
  getSupplierProductList,
  getSupplierList,
  createSupplierProduct,
  updateSupplierProduct,
} from "@/api/supplier";

import { storeToRefs } from "pinia";
import { useProjectStore } from "@/stores/project";
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
const supplierID = route.params.supplierID;
const projectStore = useProjectStore();


console.log("aaaa")
console.log(route.matched);
// 使用 storeToRefs 只获取响应式状态
const { skuList, brandList, specList } = storeToRefs(projectStore);

const { getProjectData } = projectStore;
// 定义表格数据
const tableData = ref([]);
// 定义供应商列表
const supplierList = ref([]);

// 定义添加供应商产品表单数据
const form = ref({
  supplierID: "",
  name: "",
  code: "",
  facePrice: 0,
  price: 0,
  specID: "",
  skuID: "",
  brandID: "",
});

const buttonClick = async () => {
  Object.assign(form.value, {
    supplierID: "",
    brandID: "",
    specID: "",
    skuID: "",
    code: "",
    facePrice: 0,
    price: 0,
  });
  await getProjectData();
  const res = await getSupplierList();
  supplierList.value = res;
  dialogAdd.value = true;
};

// 定义添加供应商产品弹窗的显示状态
const dialogAdd = ref(false);

async function fetchSupplierProductList() {
  const res = await getSupplierProductList({ supplierID: supplierID });
  tableData.value = res;
}

// 添加供应商产品
const addSupplierProduct = async (data) => {
  try {
    await createSupplierProduct(data);
    fetchSupplierProductList();
    ElMessage({
      message: `添加成功`,
      type: "success",
      plain: true,
    });
  } catch (error) {
    ElMessage({
      message: `添加失败`,
      type: "error",
      plain: true,
    });
  }
  dialogAdd.value = false;
};

// 编辑供应商产品
const editSupplierProduct = async (data) => {
  try {
    await updateSupplierProduct(data);
    ElMessage({
      message: `编辑成功`,
      type: "success",
      plain: true,
    });
  } catch (error) {
    ElMessage({
      message: `编辑失败`,
      type: "error",
      plain: true,
    });
  }
  fetchSupplierProductList();
};

onMounted(async () => {
  fetchSupplierProductList();
});
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
