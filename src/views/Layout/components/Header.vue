<template>
  <div class="my-header">
    <div class="button">
      <el-radio-group v-model="isCollapse">
        <el-radio-button :value="false" @click="collapseMitt.emit('collapse', false)">展开</el-radio-button>
        <el-radio-button :value="true" @click="collapseMitt.emit('collapse', true)">折叠</el-radio-button>
      </el-radio-group>
    </div>
    <div class="avater">
      <el-dropdown>
        <el-avatar :size="35" src="https://www.escook.cn/images/avatar.jpg" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import collapseMitt from '@/utils/collapsemitt.js'

const isCollapse = ref(false)

</script>

<style scoped>
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  height: 60px;
  background-color: #fff;
}
</style>
