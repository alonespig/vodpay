<template>
  <el-dialog :model-value="rechargeDialog" @update:model-value="(val) => emit('update:rechargeDialog', val)"
    title="供应商充值" width="500">
    <el-form :model="rechargeForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="rechargeForm.name" disabled />
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model.number="rechargeForm.amount" />
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
</script>
