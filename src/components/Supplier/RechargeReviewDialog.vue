<template>
  <el-dialog :model-value="props.visible" @update:model-value="(val) => emit('update:visible', val)" title="充值审核"
    width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input disabled v-model="form.supplierName" />
      </el-form-item>
      <el-form-item label="金额">
        <el-input disabled v-model.number="form.amount" />
      </el-form-item>
      <el-form-item label="充值凭证">
        <el-image :src="form.imageURL" fit="fill" style="width: 80px; height: 80px;" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio-group v-model.number="form.status">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="0">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核备注">
        <el-input style="width: 240px" v-model="form.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确认添加 </el-button>
        <el-button @click="handleCancel"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  formData: Object,
});


const emit = defineEmits(["update:visible", "submit"]);

const form = ref({});

watch(() => props.formData, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
    form.value.amount = (form.value.amount * 1.0) / 100;
  }
});

const handleOk = () => {
  emit("submit", { ...form.value });
  form.value = {};
  emit("update:visible", false);
};

const handleCancel = () => {
  emit("update:visible", false);
};
</script>
