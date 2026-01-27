<template>
  <el-dialog :model-value="props.showDialog" @update:model-value="(val) => emit('update:showDialog', val)"
    title="添加商品供应商" width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="产品名称">
        {{ formData?.projectProduct?.name || "" }}
      </el-form-item>
      <el-form-item label="供应商商品">
        <el-select v-model="form.supplierProductIDList" multiple placeholder="请选择供应商商品" style="width: 100%">
          <el-option v-for="item in formData.supplierProductList" :key="item.id"
            :label="item.name + '-' + item.supplierName" :value="item.id">
            {{ item.name }} {{ item.supplierName }} {{ item.price * 1.0 / 100 }}
          </el-option>
        </el-select>
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
  showDialog: Boolean,
  formData: Object,
});

const emit = defineEmits(["update:showDialog", "submit"]);

const form = ref({
  id: "",
  supplierProductIDList: [],
});

watch(
  () => props.formData?.projectProduct?.id,
  (id) => {
    form.value.id = id || "";
  }
);


const handleOk = () => {
  console.log("handleOk", form.value);
  emit("submit", { projectProductID: form.value.id, supplierProductIDList: form.value.supplierProductIDList });
  form.value = {}
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
