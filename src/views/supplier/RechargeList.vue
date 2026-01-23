<template>
  <div>
    <el-card>
      <template v-slot:header>
        <span>充值列表</span>
      </template>
      <RechargeTable :tableData="rechargeList" @button-click="handleClick" />
    </el-card>
    <RechargeReviewDialog :formData="rechargeInfo" v-model:visible="dialogVisible" @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import RechargeTable from "@/components/Supplier/RechargeTable.vue";
import RechargeReviewDialog from "@/components/Supplier/RechargeReviewDialog.vue";
import { supplierRechargeApi, updateSupplierRecharge } from "@/api/supplier";

const rechargeList = ref([]);
const rechargeInfo = ref({});
const dialogVisible = ref(false);

const handleClick = (row) => {
  console.log(row);
  dialogVisible.value = true;
  rechargeInfo.value = row;
};

const handleSubmit = async (formData) => {
  console.log(formData);
  await updateSupplierRecharge({
    id: formData.id,
    supplierID: formData.supplierID,
    amount: formData.amount,
    status: formData.status,
    remark: formData.remark,
  });
  getRechargeList();
}

const getRechargeList = async () => {
  rechargeList.value = await supplierRechargeApi();
  console.log(rechargeList.value);
};

onMounted(() => {
  getRechargeList();
});

</script>
