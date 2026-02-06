<template>
  <div>
    <el-table class="my-table" :data="productList" style="width: 100%">
      <el-table-column type="expand"
      >
        <template #default="props">
          <el-card class="small-card">
            <el-table :data="props.row.supplierProductList"
            :row-style="row => supplierRowStyle(row, props.row.product.price)"
            style="width: 100%">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="name" label="商品名称" />
              <el-table-column prop="supplierName" label="供应商" />
              <el-table-column prop="code" label="商品编码" />
              <el-table-column label="面值" align="center">
                <template #default="scope">
                  {{ scope.row.facePrice / 100 }} 元
                </template>
              </el-table-column>
              <el-table-column label="价格" align="center">
                <template #default="scope">
                  {{ scope.row.price / 100 }} 元
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.status === 1" type="success">
                    启用中
                  </el-tag>
                  <el-tag v-else type="danger">
                    禁用中
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center">
                <template #default="scope">
                  {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" min-width="80" align="center" />
      <el-table-column type="id" label="产品编码" prop="product.id" min-width="120" align="center" />
      <el-table-column prop="product.name" label="产品名称" min-width="220" align="center" />
      <el-table-column prop="product.facePrice" label="面值" min-width="80" align="center">
        <template #default="scope">
          {{ scope.row.product.facePrice * 1.0 / 100 }} 元
        </template>
      </el-table-column>
      <el-table-column prop="product.price" label="售价" min-width="80" align="center">
        <template #default="scope">
          {{ scope.row.product.price * 1.0 / 100 }} 元
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="100">
        <template #default="scope">
          <el-tag :type="scope.row.product.status === 1 ? 'success' : 'danger'">
            {{ scope.row.product.status === 1 ? "启用中" : "禁用中" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" min-width="180">
        <template #default="scope">
          {{ dayjs(scope.row.product.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" link size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" link size="mini" @click="handleSupplier(scope.row)">供应商</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
defineProps({
  productList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit", "add-supplier"]);
const handleEdit = (row) => {
  emit("edit", row);
};
const handleSupplier = (row) => {
  emit("add-supplier", { ...row });
};

const supplierRowStyle = ({ row }, parentPrice) => {
  if (row.price > parentPrice) {
    return {
      backgroundColor: '#fff1f0',
      color: '#cf1322'
    }
  }
  return {}
}

</script>

<style scoped>
:deep(.my-table th.el-table__cell) {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
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

:deep(.el-table__row) {
  font-size: 16px;
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

:deep(.small-card .el-table__row) {
  font-size: 14px;
}

:deep(.small-card th.el-table__cell) {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  line-height: 1.5;
  list-style: none;
}

.small-card {
  width: 80%;
  margin: 0 auto;
  background-color: #f5f7fa;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
