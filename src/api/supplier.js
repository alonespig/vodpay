import service from "@/utils/api";

// 获取供应商列表
export function getSupplierList() {
  return service({
    url: "/supplier",
    method: "get",
  });
}

// 创建供应商
export function createSupplier(data) {
  return service({
    url: "/supplier",
    method: "post",
    data,
  });
}

// 更改供应商
export function updateSupplier(data) {
  return service({
    url: "/supplier",
    method: "put",
    data,
  });
}

// 供应商充值
export function rechargeSupplier(data) {
  return service({
    url: "/supplier/recharge",
    method: "post",
    data,
  });
}


// 供应商充值
export function supplierRechargeApi(params) {
  return service({
    url: "/supplier/recharge",
    method: "get",
    params,
  });
}

// 供应商充值
export function updateSupplierRecharge(data) {
  return service({
    url: "/supplier/recharge",
    method: "put",
    data,
  });
}

// 获取供应商充值记录
export function getSupplierRechargeHistory() {
  return service({
    url: "/supplier/recharge/history",
    method: "get",
  });
}

// 创建供应商产品
export function createSupplierProduct(data) {
  return service({
    url: "/supplier/product",
    method: "post",
    data,
  });
}

// 更新供应商产品
export function updateSupplierProduct(data) {
  return service({
    url: "/supplier/product",
    method: "put",
    data,
  });
}

// 获取供应商产品列表
export function getSupplierProductList(params) {
  return service({
    url: "/supplier/product",
    method: "get",
    params: params,
  });
}
