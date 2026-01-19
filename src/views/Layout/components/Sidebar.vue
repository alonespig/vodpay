<template>
  <div class="aside"
  >
    <el-menu active-text-color="#ffd04b" background-color="black" router :default-active="$route.path"
     :collapse="isCollapse"
      text-color="#fff">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>供应商管理</span>
        </template>
        <el-menu-item index="/supplier">供应商列表</el-menu-item>
        <el-menu-item index="/supplier/product">供应商商品</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>渠道管理</span>
        </template>
        <el-menu-item index="/channel">渠道列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { Setting } from '@element-plus/icons-vue'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.aside {
  transition: width 0.7s ease;
  flex-shrink: 0;
  background-color: #22272e;
}

:deep(.el-menu) {
  width: 100%;
}

</style>
