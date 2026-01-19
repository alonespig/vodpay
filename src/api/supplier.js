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

// 获取供应商产品列表
export function getSupplierProductList() {
  return service({
    url: "/supplier/product",
    method: "get",
  });
}
