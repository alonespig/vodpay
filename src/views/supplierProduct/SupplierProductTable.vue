<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ supplierName || '' }} - 商品详情</span>
      <el-button type="primary"  @click="$emit('click-add')">添加商品</el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="supplierName" label="供应商" />
      <el-table-column prop="code" label="商品编码" />
      <el-table-column prop="facePrice" label="面值" align="center">
        <template #default="scope"> {{ (scope.row.facePrice * 1.0) / 100 }}元 </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center">
        <template #default="scope"> {{ (scope.row.price * 1.0) / 100 }}元 </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag round type="success" v-if="scope.row.status === 1">启用中</el-tag>
          <el-tag round type="danger" v-else>禁用中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" align="center" label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="$emit('click-edit', {...scope.row})">编辑</el-button>
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
  supplierName: {
    type: String,
    default: '',
  }
});

defineEmits(["click-edit", "click-add"]);
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
