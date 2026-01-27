<template>
  <ProductTable :productList="productList" />
</template>

<script setup>
import { ref, onMounted} from 'vue';
import {getProductsAPI} from "@/api/channel.js";
import ProductTable from "@/views/product/components/ProductTable.vue";

const productList = ref([])

const getProductList = async ()=> {
  const res = await getProductsAPI()
  console.log("res",res)
  productList.value = res
  console.log("productList.value",productList.value)
}

onMounted(()=> {
  getProductList()
})
</script>
