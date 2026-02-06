<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>供应商列表</span>
          <el-button type="primary" @click="showDialog = true">添加供应商</el-button>
        </div>
      </template>
      <SupplierListTable
      :tableData="supplierList"
      @click-edit="getEditInfo"
       />
    </el-card>

    <AddSupplierDialog
      v-model:showDialog="showDialog"
      @submit="HandleAddSupplier"
    />
    <EditSupplierDialog
    v-model:showDialog="editDialog"
    :supplierData="editData"
    @submit="HandleEditSupplier"
  />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import SupplierListTable from "./SupplierListTable.vue";
import AddSupplierDialog from "./AddSupplierDialog.vue";
import EditSupplierDialog from "./EditSupplierDialog.vue";
import { getSupplierList, createSupplier, updateSupplier } from "@/api/supplier-api";

const supplierList = ref([]);
const showDialog = ref(false);
const editDialog = ref(false);
const editData = ref({});

const fetchSupplierList = async () => {
    const res = await getSupplierList();
    supplierList.value = res;
}

const getEditInfo =  (row) => {
  editDialog.value = true;
  editData.value = row;
}

const HandleEditSupplier = async (data) => {
  await updateSupplier(data);
  ElMessage({
    message: `修改成功`,
    type: "success",
    plain: true,
  });
  fetchSupplierList();
}


const HandleAddSupplier = async (data) => {
  await createSupplier(data);
  ElMessage({
    message: `添加成功`,
    type: "success",
    plain: true,
  });
  fetchSupplierList();
}

onMounted(() => {
  fetchSupplierList();
});
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
