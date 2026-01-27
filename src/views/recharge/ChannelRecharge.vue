<template>
  <SupplierTable :tableData="tableData" Operation="充值" @click-emit="getRechargeInfo" />
  <RechargeDialog v-model:rechargeDialog="rechargeDialog" :data="rechargeInfo" @submit="handleRecharge" />
</template>

<script setup>
import SupplierTable from "@/components/SupplierTable.vue";
import RechargeDialog from "@/components/RechargeDialog.vue";
import { ref, onMounted } from "vue";
import { getChannelAPI } from "@/api/channel";
import { ElMessage } from "element-plus";


// 供应商充值弹窗
const rechargeDialog = ref(false);
const rechargeInfo = ref({})
// 定义表格数据
const tableData = ref([]);

const getChannelList = async ()=> {
  try {
    const res = await getChannelAPI();
    tableData.value = res;
  } catch (error) {
    console.error("获取渠道列表失败", error);
  }
}

// 表格点击充值，获取充值信息
function getRechargeInfo(row) {
  console.log(row)
  rechargeInfo.value = row;
  rechargeDialog.value = true;
}

// 渠道充值接口
const handleRecharge = async (data) => {
  console.log(data)
  // await rechargeSupplier(data);
  ElMessage({
    message: `供应商${data.name}充值成功，等待审核通过`,
    type: "success",
    plain: true,
  });
  getChannelList(); // 刷新渠道列表
}


onMounted(() => {
  getChannelList();
});
</script>
