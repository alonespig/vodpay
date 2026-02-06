<template>
  <el-dialog :model-value="props.showDialog" @update:model-value="(val) => emit('update:showDialog', val)" title="添加商品"
    width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="品牌">
        <el-select v-model="form.brandID" placeholder="请选择品牌">
          <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="规格">
        <el-select v-model="form.specID" placeholder="请选择规格">
          <el-option v-for="item in specList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SKU">
        <el-select v-model="form.skuID" placeholder="请选择SKU">
          <el-option v-for="item in skuList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="面值">
        <el-input class="rounded-input" v-model.number="form.facePrice" />
      </el-form-item>
      <el-form-item label="售价">
        <el-input v-model.number="form.price" />
      </el-form-item>
      <el-form-item label="供应商商品">
        <el-select v-model="form.supplierProductIDList" multiple placeholder="请选择供应商商品" style="width: 100%">
          <el-option v-for="item in supplierProductList" :key="item.id"
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
import { ref, watch, toRaw } from "vue";

const props = defineProps({
  showDialog: Boolean,
  formData: Object,
  brandList: Array,
  specList: Array,
  skuList: Array,
  supplierProductList: Array,
});

const emit = defineEmits(["update:showDialog", "submit", 'filter']);

const form = ref({
  skuID: null,
  brandID: null,
  specID: null,
  facePrice: null,
  price: null,
  supplierProductIDList: [],
});

watch(
  () => [form.value.skuID, form.value.brandID, form.value.specID],
  ([skuID, brandID, specID]) => {
    if(skuID != null && brandID != null && specID != null) {
      emit('filter', { skuID, brandID, specID });
    }
  }
);


const handleOk = () => {
  const rawForm = {
    ...toRaw(form.value),
  };

  emit("submit", { ...rawForm });
  form.value = {
    skuID: null,
    brandID: null,
    specID: null,
    facePrice: null,
    price: null,
    supplierProductIDList: [],
  }
  emit("update:showDialog", false);
};

const handleCancel = () => {
  emit("update:showDialog", false);
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
