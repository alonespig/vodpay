<template>
  <SupplierTable :tableData="tableData" Operation="充值" @click-emit="getRechargeInfo" />
  <RechargeDialog v-model:rechargeDialog="rechargeDialog" :data="rechargeInfo" @submit="handleRecharge" />
</template>

<script setup>
import SupplierTable from "@/components/SupplierTable.vue";
import RechargeDialog from "@/components/RechargeDialog.vue";
import { ref, onMounted } from "vue";
import { getSupplierList, rechargeSupplier } from "@/api/supplier";
import { ElMessage } from "element-plus";


// 供应商充值弹窗
const rechargeDialog = ref(false);
const rechargeInfo = ref({})
// 定义表格数据
const tableData = ref([]);

async function fetchSupplierList() {
  try {
    const res = await getSupplierList();
    tableData.value = res;
  } catch (error) {
    console.error("获取供应商列表失败", error);
  }
}

// 表格点击充值，获取充值信息
function getRechargeInfo(row) {
  console.log(row)
  rechargeInfo.value = row;
  rechargeDialog.value = true;
}

// 供应商充值接口
const handleRecharge = async (data) => {
  console.log(data)
  await rechargeSupplier(data);
  ElMessage({
    message: `供应商${data.name}充值成功，等待审核通过`,
    type: "success",
    plain: true,
  });
  fetchSupplierList(); // 刷新供应商列表
}


onMounted(() => {
  fetchSupplierList();
});
</script>
