<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>SKU列表</span>
        <el-button type="primary" @click="showDialog = true">添加SKU</el-button>
      </div>
    </template>
    <Table :tableData="skuList" />
  </el-card>

  <el-dialog v-model="showDialog" title="创建SKU" width="500">
    <el-form :model="form">
      <el-form-item label="SKU名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit"> 确认 </el-button>
        <el-button @click="showDialog = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/stores/project";
import Table from "@/views/project/components/Table.vue";

const projectStore = useProjectStore();

// 使用 storeToRefs 只获取响应式状态
const { skuList } = storeToRefs(projectStore);
// 直接从 store 实例获取方法
const { getSkuList, createProject } = projectStore;

const form = ref({
  type: "skus",
  name: "",
});

const showDialog = ref(false);

const submit = async () => {
  await createProject(form.value);
  showDialog.value = false;
  await getSkuList();
};

onMounted(() => {
  getSkuList();
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
