<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-title">
          <span>产品列表</span>
          <el-button type="primary" @click="showDialog = true">添加产品</el-button>
        </div>
      </template>
      <ProductTable :productList="productList" @edit="handleEdit"
      @add-supplier="handleAddSupplier"
      />
    </el-card>
  </div>
  <AddProductDialog
    v-model:showDialog="showDialog"
    @submit="handleSubmit"
    :skuList="skuList"
    :brandList="brandList"
    :specList="specList"
  />
  <EditProductDialog
    v-model:editDialog="editDialog"
    :editData="editData"
    @submit="handleEditSubmit"
  />
  <AddSupplierDialog
    v-model:showDialog="addDialog"
    @submit="handleAddSupplierSubmit"
    :formData="addProductData"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  getProjectProductListApi,
  createProjectProductApi,
  updateProjectProductApi,
} from "@/api/project";
import { addSupplierProductToProjectProductApi } from "@/api/channel";
import { ElMessage } from "element-plus";
import ProductTable from "./components/ProductTable.vue";
import AddProductDialog from "./components/AddProductDialog.vue";
import EditProductDialog from "./components/EditProductDialog.vue";
import AddSupplierDialog from "./components/AddSupplierDialog.vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/stores/project";
import { getSupplierProductList } from "@/api/supplier";
const route = useRoute();

const channelID = route.params.channelID;
const projectID = route.params.projectID;

const projectStore = useProjectStore();

// 使用 storeToRefs 只获取响应式状态
const { skuList, brandList, specList } = storeToRefs(projectStore);

const { getProjectData } = projectStore;

const showDialog = ref(false);
const editDialog = ref(false);
const addDialog = ref(false);
const addProductData = ref({});
const editData = ref({});

const productList = ref([]);

const getProjectProductList = async () => {
  const res = await getProjectProductListApi(channelID, projectID);
  productList.value = res;
};

const handleSubmit = async (formData) => {
  try {
    await createProjectProductApi(channelID, projectID, formData);
    ElMessage({
      message: `产品创建成功`,
      type: "success",
      plain: true,
    });
    getProjectProductList();
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
};

onMounted(() => {
  getProjectData();
  getProjectProductList();
});

const handleEdit = (row) => {
  editData.value = row;
  editDialog.value = true;
};

const handleAddSupplier = async (row) => {
  console.log(row);
  const res = await getSupplierProductList({ skuID: row.skuID, brandID: row.brandID, specID: row.specID });
  addProductData.value.supplierProductList = res;
  addProductData.value.projectProduct = row;
  addDialog.value = true;
  console.log("addProductData.value", addDialog.value);
}



const handleEditSubmit = async (formData) => {
  try {
    await updateProjectProductApi(channelID, projectID, formData.id, formData);
    ElMessage({
      message: `产品${formData.name}更新成功`,
      type: "success",
      plain: true,
    });
    getProjectProductList();
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
};

const handleAddSupplierSubmit = async (formData) => {
  console.log("handleAddSupplierSubmit", formData);
  try {
    await addSupplierProductToProjectProductApi(formData);
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
  getProjectProductList();
};
</script>

<style scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
