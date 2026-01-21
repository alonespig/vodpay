<template>
  <div>
    <el-table class="my-table" :data="productList" style="width: 100%">
      <el-table-column type="index" label="#" width="80" align="center" />
      <el-table-column type="id" label="产品编码" prop="id" width="80" align="center" />
      <el-table-column prop="name" label="供应商" width="160" align="center" />
      <el-table-column prop="facePrice" label="面值" width="300" align="center" />
      <el-table-column prop="price" label="售价" width="300" align="center" />
      <el-table-column label="状态" align="center" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? "启用中" : "禁用中" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="180">
        <template #default="scope">
          {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" link size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" link size="mini" @click="handleProject(scope.row)"
            >供应商</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
const props = defineProps({
  productList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit", "project"]);
const handleEdit = (row) => {
  emit("edit", row);
};
const handleProject = (row) => {
  emit("project", row.id);
};
</script>

<style scoped>
:deep(.my-table th.el-table__cell) {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  line-height: 1.5;
  list-style: none;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol;
}

:deep(.my-table td.el-table__cell) {
  font-size: 16px;
}
</style>
