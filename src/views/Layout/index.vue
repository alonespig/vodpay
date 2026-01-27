<template>
  <el-container class="layout">
    <!-- 左侧 -->
    <el-aside class="aside" :width="isCollapse ? '60px' : '200px'">
      <Sidebar :isCollapse="isCollapse" />
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <!-- <Breadcrumb /> -->
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { ref } from 'vue'
import collapseMitt from '@/utils/collapsemitt.js'

const isCollapse = ref(false)

// 监听事件
collapseMitt.on('collapse', (val) => {
  isCollapse.value = val
})
</script>

<style scoped>
.layout {
  height: 100vh;
}

.layout-header {
  width: auto;
  height: 55px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
}

.aside {
  transition: width 0.7s ease;
  flex-shrink: 0;
  background-color: #001529;
}

.main {
  background-color: #f0f2f5;
}
</style>
