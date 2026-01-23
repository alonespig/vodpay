<!-- 供应商充值审核表格 -->
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="#" />
    <el-table-column prop="supplierName" label="供应商" />
    <el-table-column prop="amount" label="充值金额" align="center">
      <template #default="scope"> {{ (scope.row.amount * 1.0) / 100 }}元 </template>
    </el-table-column>
    <el-table-column prop="applyUserName" label="申请人" />
    <el-table-column  label="凭证" align="center">
      <template #default="scope">
        <el-image :src="scope.row.imageURL" fit="fill" style="width: 80px; height: 80px;" />
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" align="center" label="申请时间">
      <template #default="scope">
        {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="HandleClick(scope.row)">审核</el-button>
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

const emit = defineEmits(["button-click"]);
console.log(props.tableData);
const HandleClick = (row) => {
  emit("button-click", {...row});
};

</script>
