<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-title">
          <span>渠道列表</span>
          <el-button type="primary" @click="showDialog = true">添加渠道</el-button>
        </div>
      </template>
      <ChannelTable :tableData="tableData" @edit="handleEdit" @project="handleProject" />
    </el-card>
  </div>
  <AddChannelDialog v-model:showDialog="showDialog" @submit="handleSubmit" />
  <EditChannelDialog
    v-model:editDialog="editDialog"
    :editData="editData"
    @submit="handleEditSubmit"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getChannels, createChannel, updateChannel } from "@/api/channel";
import { ElMessage } from "element-plus";
import ChannelTable from "./components/ChannelTable.vue";
import AddChannelDialog from "@/views/channel/components/AddChannelDialog.vue";
import EditChannelDialog from "@/views/channel/components/EditChannelDialog.vue";

const showDialog = ref(false);
const editDialog = ref(false);

const router = useRouter();
const editData = ref({});

const tableData = ref([]);

const getChannelList = async () => {
  const res = await getChannels();
  tableData.value = res;
};

const handleSubmit = async (formData) => {
  try {
    await createChannel(formData);
    ElMessage({
      message: `渠道${formData.name}创建成功`,
      type: "success",
      plain: true,
    });
    getChannelList();
  } catch (error) {
    ElMessage({
      message: error.message,
      type: "error",
      plain: true,
    });
  }
};

onMounted(() => {
  getChannelList();
});

const handleEdit = (row) => {
  editData.value = row;
  editDialog.value = true;
};

const handleProject = (projectid) => {
  router.push({
    path: `/channel/${projectid}/project`,
  });
};

const handleEditSubmit = async (formData) => {
  try {
    await updateChannel(formData);
    ElMessage({
      message: `渠道${formData.name}更新成功`,
      type: "success",
      plain: true,
    });
    getChannelList();
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
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
