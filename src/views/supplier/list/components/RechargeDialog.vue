<template>
  <el-dialog :model-value="rechargeDialog" @update:model-value="(val) => emit('update:rechargeDialog', val)"
    title="供应商充值" width="500">
    <el-form :model="rechargeForm" label-width="auto" style="max-width: 800px">
      <el-form-item label="供应商">
        <el-input v-model="rechargeForm.name" disabled />
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model.number="rechargeForm.amount" />
      </el-form-item>
      <el-form-item label="充值凭证">
        <!-- :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" -->
        <el-upload class="avatar-uploader" action="http://localhost:8088/upload"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="rechargeForm.imageURL" :src="rechargeForm.imageURL" class="avatar" />
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
import { watch, reactive } from 'vue';
const props = defineProps({
  rechargeDialog: {
    type: Boolean,
    default: false,
  },
  supplierData: {
    type: Object,
    default: () => { },
  },
})

const emit = defineEmits(["update:rechargeDialog", "submit"])

const rechargeForm = reactive({
  id: 0,
  name: '',
  amount: 0,
  imageUrl: '',
})

watch(() => props.supplierData, (newVal) => {
  if (newVal) {
    rechargeForm.id = newVal.id;
    rechargeForm.name = newVal.name;
    rechargeForm.amount = 0;
  }
})

const handleOk = () => {
  emit("submit", { ...rechargeForm });
  rechargeForm.amount = 0;
  emit("update:rechargeDialog", false);
}

const handleCancel = () => {
  emit("update:rechargeDialog", false);
}

const handleAvatarSuccess = (response, uploadFile, uploadFiles) => {
  // response：后端返回的数据（JSON）
  // uploadFile：当前上传的文件信息
  // uploadFiles：已上传的文件列表
  console.log(response)
  rechargeForm.imageURL = response.data.url
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
