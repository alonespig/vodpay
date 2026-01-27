<!-- components/Breadcrumb.vue -->
<template>
  <el-card>
    导航栏
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path"
        :to="index < breadcrumbList.length - 1 ? item.path : undefined">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbList = computed(() => {
  return route.matched
    .filter(r => r.meta?.title)
    .map(r => ({
      title: r.meta.title,
      path: r.path.includes(':')
        ? r.path.replace(':supplierId', route.params.supplierId)
        : r.path,
    }))
})
</script>
