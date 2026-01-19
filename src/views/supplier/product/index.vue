<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>供应商商品列表</span>
          <el-button type="primary">添加供应商</el-button>
        </div>
      </template>
      <Table :tableData="tableData" />
    </el-card>
  </div>
</template>


<script setup>
import Table from './components/Table.vue'
import { ref, onMounted } from 'vue'
import { getSupplierProductList } from "@/api/supplier"

// 定义表格数据
const tableData = ref([])

async function fetchSupplierProductList() {
  try {
    const res = await getSupplierProductList()
    tableData.value = res
  } catch (error) {
    console.error('获取供应商商品列表失败', error)
  }
}

onMounted(() => {
  fetchSupplierProductList()
})

</script>


<style >
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
