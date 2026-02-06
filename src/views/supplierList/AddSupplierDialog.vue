<template>
  <el-dialog :model-value="props.showDialog"
    @update:model-value="(val) => emit('update:showDialog', val)"
    title="添加供应商" width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="供应商编码">
        <el-input v-model="form.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确认添加 </el-button>
        <el-button @click="$emit('update:showDialog', false)"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref } from "vue";

const props = defineProps({
  showDialog: Boolean,
})
const emit = defineEmits(["update:showDialog", "submit"])

const form = ref({
  name: "",
  code: "",
});

const handleOk = () => {
  emit("submit", { ...form.value });
  form.value = {
    name: "",
    code: "",
  };
  emit("update:showDialog", false);
}
</script>
