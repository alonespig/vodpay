<template>
  <el-dialog
    :model-value="props.editDialog"
    @update:model-value="(val) => emit('update:editDialog', val)"
    title="编辑产品"
    width="500"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="项目">
        <el-input disabled v-model="form.name" />
      </el-form-item>
      <el-form-item label="面值">
        <el-input v-model.number="form.facePrice" />
      </el-form-item>
      <el-form-item label="售价">
        <el-input v-model.number="form.price" />
      </el-form-item>
      <el-form-item label="状态" label-width="auto">
        <el-switch
          v-model="form.status"
          active-text="开启"
          inactive-text="关闭"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确认编辑 </el-button>
        <el-button @click="handleCancel"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  editDialog: Boolean,
  editData: Object,
});

const emit = defineEmits(["update:editDialog", "submit"]);

const form = ref({
  id: 0,
  name: "",
  facePrice: 0,
  price: 0,
  status: 0,
});

watch(
  () => props.editData,
  (newVal) => {
    Object.assign(form.value, {
      id: newVal.id,
      name: newVal.name,
      facePrice: newVal.facePrice * 1.0 / 100,
      price: newVal.price * 1.0 / 100,
      status: newVal.status,
    });
  },
);

const handleOk = () => {
  emit("submit", { ...form.value });
  emit("update:editDialog", false);
};

const handleCancel = () => {
  emit("update:editDialog", false);
};
</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
