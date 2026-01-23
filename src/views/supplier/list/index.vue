<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>供应商列表</span>
          <el-button type="primary" @click="dialogAddSupplier">添加供应商</el-button>
        </div>
      </template>
      <SupplierTable :tableData="tableData" @click-recharge="getRechargeInfo" @click-product="getSupplieID"
        :handleEdit="updateSupplierStatus" />
    </el-card>
    <el-dialog v-model="dialogSupplierVisible" title="添加供应商" width="500">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="供应商">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="供应商编码">
          <el-input v-model="form.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addSupplier"> 确认添加 </el-button>
          <el-button @click="dialogSupplierVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
    <RechargeDialog v-model:rechargeDialog="rechargeDialog" :supplierData="rechargeInfo" @submit="handleRecharge" />
  </div>
</template>

<script setup>
import SupplierTable from "./components/SupplierTable.vue";
import RechargeDialog from "./components/RechargeDialog.vue";
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getSupplierList, createSupplier, rechargeSupplier, updateSupplier } from "@/api/supplier";
import { ElMessage } from "element-plus";

const router = useRouter();

// 供应商充值弹窗
const rechargeDialog = ref(false);
const rechargeInfo = ref({})
// 定义表格数据
const tableData = ref([]);
const form = ref({
  name: "",
  code: "",
});
const dialogSupplierVisible = ref(false);

async function fetchSupplierList() {
  try {
    const res = await getSupplierList();
    tableData.value = res;
    form.value = {
      name: "",
      code: "",
    };
  } catch (error) {
    console.error("获取供应商列表失败", error);
  }
}

// 表格点击充值，获取充值信息
function getRechargeInfo(row) {
  rechargeInfo.value = row;
  rechargeDialog.value = true;
}

function getSupplieID(id) {
  console.log(id)
  router.push({
    name: 'SupplierProduct',
    params: { supplierID: id },
  })
}

// 添加供应商
async function addSupplier() {
  try {
    await createSupplier(form.value);
    dialogSupplierVisible.value = false;
    fetchSupplierList();
  } catch (error) {
    console.error("添加供应商失败", error);
  }
}

const updateSupplierStatus = async (data) => {
  try {
    await updateSupplier(data);
    ElMessage({
      message: `供应商${data.name}状态更新成功，状态${data.status == 1 ? "启用" : "禁用"}`,
      type: "success",
      plain: true,
    });
  } catch (error) {
    ElMessage({
      message: `供应商${data.name}状态更新失败，状态${data.status == 1 ? "启用" : "禁用"}`,
      type: "error",
      plain: true,
    });
  }
  fetchSupplierList();
};

// 处理添加供应商
function dialogAddSupplier() {
  dialogSupplierVisible.value = true;
}

// 供应商充值接口
async function handleRecharge(data) {
  try {
    await rechargeSupplier(data);
    ElMessage({
      message: `供应商${data.name}充值成功，等待审核通过`,
      type: "success",
      plain: true,
    });
    fetchSupplierList(); // 刷新供应商列表
  } catch (error) {
    ElMessage({
      message: `供应商${data.name}充值失败，充值金额${data.amount}`,
      type: "error",
      plain: true,
    });
  }
}

onMounted(() => {
  fetchSupplierList();
});
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
