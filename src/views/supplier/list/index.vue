<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>供应商列表</span>
          <el-button type="primary" @click="dialogAddSupplier">添加供应商</el-button>
        </div>
      </template>
      <Table :tableData="tableData" />
    </el-card>
    <el-dialog v-model="dialogSupplierVisible" title="Tips" width="500" :before-close="handleClose">
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSupplierVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogSupplierVisible = false"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import Table from "./components/Table.vue";
import { ref, onMounted } from "vue";
import { getSupplierList } from "@/api/supplier";

// 定义表格数据
const tableData = ref([]);

const dialogSupplierVisible = ref(false);

async function fetchSupplierList() {
  try {
    const res = await getSupplierList();
    tableData.value = res;
  } catch (error) {
    console.error("获取供应商列表失败", error);
  }
}

// 处理添加供应商
function dialogAddSupplier() {
  dialogSupplierVisible.value = true;
  console.log("添加供应商");
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
