<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="#"  />
    <el-table-column prop="name" label="供应商"/>
    <el-table-column prop="code" label="供应商编码"/>
    <el-table-column prop="created_at" align="center" label="创建时间" >
      <template #default="scope">
        {{ dayjs(scope.row.created_at).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default>
        <el-button type="primary" link >商品</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  }
})

console.log('tableData', props.tableData)

</script>
