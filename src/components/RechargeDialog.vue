<template>
  <el-dialog :model-value="rechargeDialog" @update:model-value="(val) => emit('update:rechargeDialog', val)"
    title="供应商充值" width="500">
    <el-form :model="form" label-width="auto" style="max-width: 800px">
      <el-form-item label="供应商">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model.number="form.amount" />
      </el-form-item>
      <el-form-item label="充值凭证">
        <el-upload class="avatar-uploader" action="http://localhost:8088/upload"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="form.imageURL" :src="form.imageURL" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确认充值 </el-button>
        <el-button @click="handleCancel"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, ref } from 'vue';
const props = defineProps({
  rechargeDialog: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => { },
  },
})

const emit = defineEmits(["update:rechargeDialog", "submit"])

const form = ref({})

watch(() => props.rechargeDialog, (val) => {
  if (val && props.data) {
    form.value = {
      id: props.data.id,
      name: props.data.name,
      amount: 0,
      imageURL: ''
    }
  }
})

const handleOk = () => {
  emit("submit", { ...form.value });
  form.value.amount = 0;
  emit("update:rechargeDialog", false);
}

const handleCancel = () => {
  emit("update:rechargeDialog", false);
}

const handleAvatarSuccess = (response) => {
  // response：后端返回的数据（JSON）
  // uploadFile：当前上传的文件信息
  // uploadFiles：已上传的文件列表
  console.log(response)
  form.value.imageURL = response.data.url
}
</script>


<style scoped>
.avatar-uploader {
  width: 120px;
  height: 120px;
  margin: auto;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

</style>
