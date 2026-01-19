<template>
  <div>
    <el-card>
      <template #header>
        <span>渠道列表</span>
      </template>
    </el-card>
  </div>
</template>


<script setup>
// src/utils/request.js
import axios from 'axios'
// 创建一个axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

console.log('service', service)
</script>
