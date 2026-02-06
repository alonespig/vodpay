<template>
  <div>
    <el-breadcrumb separator=">" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/channel' }">渠道列表</el-breadcrumb-item>
      <el-breadcrumb-item>
        项目列表
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div class="card-title">
          <span> {{ channelName }} 项目列表</span>
          <el-button type="primary" @click="showDialog = true">添加项目</el-button>
        </div>
      </template>
      <ProjectTable :tableData="projectData" @edit="handleEdit" @click-project="handleProject" />
    </el-card>
  </div>
  <AddProjectDialog v-model:showDialog="showDialog" @submit="handleSubmit" />
  <EditProjectDialog v-model:editDialog="editDialog" :editData="editData" @submit="handleEditSubmit" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProjectListAPI,createProjectAPI, updateProjectAPI } from "@/api/channel-api";
import { ElMessage } from "element-plus";

import ProjectTable from "./components/ProjectTable.vue";
import AddProjectDialog from "./components/AddProjectDialog.vue";
import EditProjectDialog from "./components/EditProjectDialog.vue";

const route = useRoute();
const router = useRouter();
const channelID = route.params.channelID;
const showDialog = ref(false);
const editDialog = ref(false);

const editData = ref({});

const channelName = ref({});
const projectData = ref([]);

const getProjectList = async () => {
  const res = await getProjectListAPI({channelID: channelID});
  projectData.value = res.projects;
  channelName.value = res.channelName;
};

const handleSubmit = async (formData) => {
  console.log(formData);
  try {
    await createProjectAPI({channelID: Number(channelID), name: formData.name});
    ElMessage({
      message: `项目${formData.name}创建成功`,
      type: "success",
      plain: true,
    });
    getProjectList();
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
};

onMounted(() => {
  getProjectList();
});

const handleEdit = (row) => {
  editData.value = row;
  editDialog.value = true;
};

const handleProject = (projectid) => {
  console.log(projectid);
  router.push({
    path: `/channel/${channelID}/project/${projectid}/product`,
  });
};

const handleEditSubmit = async (formData) => {
  console.log(formData);
  try {
    await updateProjectAPI(formData);
    ElMessage({
      message: `项目${formData.name}更新成功`,
      type: "success",
      plain: true,
    });
    getProjectList();
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
};
</script>

<style scoped>
.breadcrumb {
  font-size: 16px;
  margin-bottom: 20px;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
