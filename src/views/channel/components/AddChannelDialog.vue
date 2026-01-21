<template>
  <el-dialog
    :model-value="props.showDialog"
    @update:model-value="(val) => emit('update:showDialog', val)"
    title="添加渠道"
    width="500"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="渠道">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="白名单">
        <el-input v-model="form.whiteList" />
      </el-form-item>
      <el-form-item label="授信">
        <el-input v-model.number="form.creditLimit" />
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
import { reactive } from "vue";

const props = defineProps({
  showDialog: Boolean,
  formData: Object,
});

const emit = defineEmits(["update:showDialog", "submit"]);

const form = reactive({
  name: "",
  whiteList: "",
  creditLimit: 100,
});

const handleOk = () => {
  emit("submit", { ...form });
  Object.assign(form, {
    name: "",
    whiteList: "",
    creditLimit: 100,
  });
  emit("update:showDialog", false);
};

const handleCancel = () => {
  emit("update:showDialog", false);
};
</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
