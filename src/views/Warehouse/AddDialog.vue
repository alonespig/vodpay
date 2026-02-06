<template>
    <el-dialog :model-value="showDialog" @update:model-value="(val) => emit('update:showDialog', val)"
    :title="`创建${selectName}`" width="500">
    <el-form :model="form">
      <el-form-item :label="`${selectName}名称`" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOK"> 确认 </el-button>
        <el-button @click="$emit('update:showDialog', false)">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  selectName: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:showDialog', 'submit'])

const form = ref({})

const handleOK = () => {
  emit('submit', {...form.value})
  form.value = {}
  emit("update:showDialog", false);
}
</script>
