<template>
  <el-card>
     <template #header>
      <span> 供应商列表 </span>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="供应商" />
      <el-table-column prop="code" label="供应商编码" />
      <el-table-column prop="status" align="center" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{
            scope.row.status === 1 ? "启用" : "禁用"
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="余额" align="center">
        <template #default="scope"> {{ (scope.row.balance * 1.0) / 100 }}元 </template>
      </el-table-column>
      <el-table-column prop="created_at" align="center" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.created_at).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="Handler(scope.row)">{{ Operation }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import dayjs from "dayjs";
defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  Operation: {
    type: String,
    default: "充值",
  },
});

const emit = defineEmits(["click-emit"]);

const Handler = (row) => {
  emit("click-emit", { ...row });
};
</script>
