<template>
  <el-dialog :model-value="props.showDialog" @update:model-value="(val) => emit('update:showDialog', val)"
    title="供应商编辑" width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model.number="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitEdit"> 确认 </el-button>
        <el-button @click="emit('update:showDialog', false)"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup>
import {ref, watch} from 'vue'
const props = defineProps({
  showDialog: Boolean,
  supplierData: Object,
})

const emit = defineEmits(["update:showDialog", "submit"])

const form = ref({})

watch(() => props.supplierData, (newVal) => {
  form.value = newVal
})

const submitEdit = () => {
  emit("submit", { ...form.value });
  emit("update:showDialog", false);
}
</script>
