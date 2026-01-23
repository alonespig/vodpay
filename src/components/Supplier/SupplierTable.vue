<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="#" />
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="supplierName" label="供应商" />
    <el-table-column prop="code" label="商品编码" />
    <el-table-column prop="facePrice" label="面值" align="center">
      <template #default="scope"> {{ (scope.row.facePrice * 1.0) / 100 }}元 </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" align="center">
      <template #default="scope"> {{ (scope.row.price * 1.0) / 100 }}元 </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" align="center">
      <template #default="scope">
        <el-tag round type="success" v-if="scope.row.status === 1">启用中</el-tag>
        <el-tag round type="danger" v-else>禁用中</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" align="center" label="创建时间">
      <template #default="scope">
        {{ dayjs(scope.row.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="clickEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="编辑供应商产品" v-model="editShow" width="50%">
    <el-form :model="editForm" label-width="120px">
      <el-form-item label="供应商" prop="supplierName">
        <el-input disabled v-model="editForm.supplierName" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input disabled v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="商品编码" prop="code">
        <el-input disabled v-model="editForm.code" />
      </el-form-item>
      <el-form-item label="面值" prop="facePrice">
        <el-input v-model.number="editForm.facePrice" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="editForm.price" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model.number="editForm.status"
          active-text="开启"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确认添加 </el-button>
        <el-button @click="handleCancel"> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
});

const editForm = ref({
  id: 0,
  name: "",
  code: "",
  supplierID: 0,
  supplierName: "",
  status: 0,
  facePrice: 0,
  price: 0,
});

const editShow = ref(false);

const emit = defineEmits(["submitEdit"]);

const clickEdit = (row) => {
  Object.assign(editForm.value, {
    id: row.id,
    name: row.name,
    code: row.code,
    supplierID: row.supplierID,
    supplierName: row.supplierName,
    status: row.status,
    facePrice: (row.facePrice * 1.0) / 100,
    price: (row.price * 1.0) / 100,
  });
  editShow.value = true;
};

const handleOk = () => {
  emit("submitEdit", editForm.value);
  editShow.value = false;
};

const handleCancel = () => {
  editShow.value = false;
  Object.assign(editForm.value, {
    supplierID: "",
    name: "",
    supplierName: "",
    status: 0,
    code: "",
    facePrice: 0,
    price: 0,
  });
};
</script>
