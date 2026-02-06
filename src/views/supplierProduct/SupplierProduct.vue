<template>
    <SupplierProductTable
    :table-data="supplierProductList"
    :supplierName="query.supplierName"
    @click-edit="handleClickEdit"
    @click-add="handleClickAdd"
     />
    <EditSupplierProduct
      v-model:edit-show="editShow"
      :supplierProduct="supplierProduct"
      @submit="handleSubmit"
    />
    <AddSupplierProductDialog
      v-model:showDialog="addShow"
      :supplierData="supplierData"
      :skuList="skuList"
      :brandList="brandList"
      :specList="specList"
      @submit="handleAddProduct"
    />
</template>


<script setup>
import { ref, onMounted, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getSupplierProductList, updateSupplierProduct, createSupplierProduct } from '@/api/supplier-api';
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/stores/project";
import SupplierProductTable from './SupplierProductTable.vue';
import EditSupplierProduct from './EditSupplierProduct.vue';
import AddSupplierProductDialog from './AddSupplierProductDialog.vue'
// useRoute 是一个 Hook，用于获取当前路由对象
// route 是路由对象
let route = useRoute();
// 通过 toRefs 解构响应式对象 route 要不然会丢失响应式
let {query} = toRefs(route);


const projectStore = useProjectStore();

// 使用 storeToRefs 只获取响应式状态
const { skuList, brandList, specList } = storeToRefs(projectStore);

const { getProjectData } = projectStore;

const editShow = ref(false);
const supplierProduct = ref({});

const supplierData = ref({});

const addShow = ref(false);


const handleClickAdd = () => {
  addShow.value = true;
  supplierData.value = {
    supplierID: Number(query.value.supplierId),
    supplierName: query.value.supplierName,
  }
}

const handleAddProduct = async (form) => {
  await createSupplierProduct(form);
  ElMessage({
    message: `添加成功`,
    type: "success",
    plain: true,
  });
  fetchSupplierProductList();
}


watch(() => route.query, (val) => {
  if (val) {
    supplierData.value = val;
    supplierData.value.supplierID = Number(supplierData.value.supplierID);
    // 当路由参数变化时，重新获取数据
    console.log(supplierData.value.supplierID);
    fetchSupplierProductList();
  }
});

const supplierProductList = ref([]);

// 获取供应商产品列表
const fetchSupplierProductList = async () => {
  const res = await getSupplierProductList({ supplierID: query.value.supplierId });
  supplierProductList.value = res;
}

const handleClickEdit = (row) => {
  console.log(row);
  supplierProduct.value = row;
  editShow.value = true;
}

const handleSubmit = async (form) => {
  try {
    await updateSupplierProduct(form);
    ElMessage({
      message: `供应商产品${form.name}更新成功`,
      type: "success",
      plain: true,
    });
    fetchSupplierProductList();
  } catch (error) {
    console.error('Failed to update supplier product:', error);
    ElMessage({
      message: `供应商产品${form.name}更新失败`,
      type: "error",
      plain: true,
    });
  }
}


onMounted(() => {
  fetchSupplierProductList();
  getProjectData();
});
</script>
