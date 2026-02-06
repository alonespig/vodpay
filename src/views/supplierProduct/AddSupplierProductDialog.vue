<template>
  <el-dialog
    :model-value="props.showDialog"
    @update:model-value="(val) => emit('update:showDialog', val)"
    title="添加商品"
    width="500"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="form.supplierName" disabled />
      </el-form-item>
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
        <el-input v-model.number="form.facePrice" />
      </el-form-item>
      <el-form-item label="售价">
        <el-input v-model.number="form.price" />
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
import { ref, watch } from "vue";

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
  supplierData: {
    type: Object,
    default: () => {},
  },
  skuList: {
    type: Array,
    default: () => [],
  },
  brandList: {
    type: Array,
    default: () => [],
  },
  specList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:showDialog", "submit"]);

const form = ref({
  supplierID: 0,
  supplierName: '',
  skuID: 0,
  brandID: 0,
  specID: 0,
  facePrice: 0,
  price: 0,
});

watch(() => props.supplierData, (val) => {
  if (val) {
    form.value.supplierID = val.supplierID;
    form.value.supplierName = val.supplierName;
  }
});


const handleOk = () => {
  emit("submit", { ...form.value });
  emit("update:showDialog", false);
};


</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
