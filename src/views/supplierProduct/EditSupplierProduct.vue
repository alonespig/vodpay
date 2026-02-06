<template>
  <el-dialog title="编辑供应商产品"
   :model-value="props.editShow"
    @update:model-value="(val) => emit('update:editShow', val)"
    width="50%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="供应商" prop="supplierName">
        <el-input disabled v-model="form.supplierName" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input disabled v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品编码" prop="code">
        <el-input disabled v-model="form.code" />
      </el-form-item>
      <el-form-item label="面值" prop="facePrice">
        <el-input v-model.number="form.facePrice" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="form.price" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model.number="form.status"
          active-text="开启"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit"> 确认修改</el-button>
        <el-button @click="$emit('update:editShow', false)"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  editShow: {
    type: Boolean,
    default: false
  },
  supplierProduct: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:editShow', 'submit'])

const form = ref({
  supplierName: '',
  name: '',
  code: '',
  facePrice: 0,
  price: 0,
  status: 0
})

const handleSubmit = () => {
  emit('submit', {...form.value})
  emit('update:editShow', false)
}

watch(() => props.supplierProduct, (newVal) => {
  if (newVal) {
    form.value = {
      ...newVal
    }
    form.value.price = form.value.price * 1.0 / 100
    form.value.facePrice = form.value.facePrice * 1.0 / 100
  }
})

</script>
