<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span> {{ title }} 列表</span>
        <el-button type="primary" @click="emit('click-add', title)">添加 {{ title }}</el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="450px" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="createdAt" align="center" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import dayjs from "dayjs";
defineProps({
  title: {
    type: String,
    default: ' '
  },
  tableData: {
    type: Array,
    default: () => [],
  }
});
const emit = defineEmits(['click-add'])
</script>


<style>
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
