<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="#" width="450px" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="createdAt" align="center" label="创建时间">
      <template #default="scope">
        {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
});
</script>
