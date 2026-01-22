<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="#" />
    <el-table-column prop="name" label="供应商" />
    <el-table-column prop="code" label="供应商编码" />
    <el-table-column prop="status" align="center" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{
          scope.row.status === 1 ? "启用" : "禁用"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="balance" label="余额" align="center">
      <template #default="scope"> {{ (scope.row.balance * 1.0) / 100 }}元 </template>
    </el-table-column>
    <el-table-column prop="created_at" align="center" label="创建时间">
      <template #default="scope">
        {{ dayjs(scope.row.created_at).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" link @click="clickRecharge(scope.row)">充值</el-button>
        <el-button type="primary" link @click="clickEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- <el-dialog v-model="dialogShow" title="供应商充值" width="500">
    <el-form :model="rechargeForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="rechargeForm.supplierName" disabled />
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model.number="rechargeForm.amount" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitRecharge"> 确认充值 </el-button>
        <el-button @click="dialogShow = false"> 取消 </el-button>
      </div>
    </template>
  </el-dialog> -->

  <el-dialog v-model="dialogEdit" title="供应商编辑" width="500">
    <el-form :model="supplierStatusForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="供应商">
        <el-input v-model="supplierStatusForm.name" disabled />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model.number="supplierStatusForm.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitEdit"> 确认 </el-button>
        <el-button @click="dialogEdit = false"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  handleEdit: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(["click-recharge"]);

const dialogEdit = ref(false);

const supplierStatusForm = ref({
  id: "",
  name: "",
  status: 1,
});

// const rechargeInfo = ref({})

const submitEdit = () => {
  props.handleEdit(supplierStatusForm.value);
  dialogEdit.value = false;
};

const clickRecharge = (row) => {
  console.log(row);
  // rechargeInfo.value = row.value;
  emit("click-recharge", {...row});
};

const clickEdit = (row) => {
  supplierStatusForm.value = {
    id: row.id,
    name: row.name,
    status: row.status,
  };
  dialogEdit.value = true;
};
</script>
