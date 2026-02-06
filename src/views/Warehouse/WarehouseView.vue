<template>
  <el-card>
    <el-tabs  v-model="activeName" class="demo-tabs">
    <el-tab-pane name="first">
      <template #label>
        <span class="title">
          <span>品牌列表</span>
        </span>
      </template>
      <BaseTable :tableData="brandList" :title="'品牌'" @click-add="handleAdd" />
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>
        <span class="title">
          <span>规格列表</span>
        </span>
      </template>
      <BaseTable :tableData="specList" :title="'规格'" @click-add="handleAdd" />
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>
        <span class="title">
          <span>SKU列表</span>
        </span>
      </template>
      <BaseTable :tableData="skuList" :title="'SKU'" @click-add="handleAdd" />
    </el-tab-pane>
  </el-tabs>
  </el-card>
  <AddDialog
    v-model:showDialog="showDialog"
    :selectName="selectName"
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {getSkuListAPI, CreateProjectSpecAPI,
  getBrandListAPI,
  getSpecListAPI,
} from "@/api/product-api";
import BaseTable from './BaseTable.vue';
import AddDialog from './AddDialog.vue';
import { ElMessage } from 'element-plus';

const activeName = ref('first')
const showDialog = ref(false)

const skuList = ref([])
const getSKUList = async ()=> {
  const res = await getSkuListAPI();
  skuList.value = res;
  console.log("skuList", skuList.value);
}

const selectName = ref('')

const brandList = ref([])
const getBrandList = async ()=> {
  const res = await getBrandListAPI();
  brandList.value = res;
  console.log("brandList", brandList.value);
}

const specList = ref([])
const getSpecList = async ()=> {
  const res = await getSpecListAPI();
  specList.value = res;
  console.log("specList", specList.value);
}

const handleAdd = (typeR) => {
  console.log("typeR", typeR);
  selectName.value = typeR;
  showDialog.value = true;
}

const handleSubmit = async (form) => {
  console.log("form", form);
  let type = ''
  switch (activeName.value) {
    case 'first':
      type = 'brands'
      break
    case 'second':
      type = 'specs'
      break
    case 'third':
      type = 'skus'
      break
    default:
      break
  }
  await CreateProjectSpecAPI({
    type: type,
    name: form.name,
  })
  ElMessage.success('添加成功');
  if (type === 'brands') {
    getBrandList();
  } else if (type === 'specs') {
    getSpecList();
  } else if (type === 'skus') {
    getSKUList();
  }
}

onMounted(() => {
  getBrandList();
  getSpecList();
  getSKUList();
})
</script>


<style>
.title {
  font-size: 16px;
  font-weight: 500px;
}
</style>
