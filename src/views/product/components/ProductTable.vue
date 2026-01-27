<template>
  <el-card>
    <el-table :data="productList" style="width: 100%" :row-key="row => row.projectProduct.id">
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template #default="props">
          <el-card class="small-card">
            <el-table :data="props.row.supplierProduct" >
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
                  <el-tag v-if="scope.row.status === 1" type="success" round>
                    启用中
                  </el-tag>
                  <el-tag v-else type="danger" round>
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
      <!-- 主表 -->
      <el-table-column type="index" label="#" width="60" align="center" />

      <el-table-column label="产品编码" min-width="120" align="center">
        <template #default="scope">{{ scope.row.projectProduct.id }}</template>
      </el-table-column>

      <el-table-column label="产品名称" min-width="220">
        <template #default="scope">{{ scope.row.projectProduct.name }}</template>
      </el-table-column>

      <el-table-column label="面值" align="center">
        <template #default="scope">
          {{ scope.row.projectProduct.facePrice / 100 }} 元
        </template>
      </el-table-column>
      <el-table-column label="售价" align="center">
        <template #default="scope">
          {{ scope.row.projectProduct.price / 100 }} 元
        </template>
      </el-table-column>

       <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.projectProduct.status === 1" type="success" round>
            启用中
          </el-tag>
          <el-tag v-else type="danger" round>
            禁用中
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template #default="scope">
          {{ dayjs(scope.row.projectProduct.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import dayjs from "dayjs"

defineProps({
  productList: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.small-card {
  width: 96%;
  margin: 10px auto;
}
</style>
