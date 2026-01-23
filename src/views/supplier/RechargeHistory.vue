<template>
  <el-card>
    <template v-slot:header>
      <span>充值记录</span>
    </template>
    <RechargeHistoryTable :tableData="rechargeList" @button-click="handleClick" />
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import RechargeHistoryTable from "@/components/Supplier/RechargeHistoryTable.vue";
import { getSupplierRechargeHistory } from "@/api/supplier";

const rechargeList = ref([]);

const getRechargeList = async () => {
  rechargeList.value = await getSupplierRechargeHistory();
  console.log(rechargeList.value);
};

onMounted(() => {
  getRechargeList();
});

</script>
