import service from "@/utils/api";

export function getSupplierList(params) {
  return service({
    url: "/supplier",
    method: "get",
    params,
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

// 获取供应商产品列表
export function getSupplierProductList(params) {
  return service({
    url: "/supplier/product",
    method: "get",
    params: params,
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


// 获取项目列表
export function getProjectList(params) {
  return service({
    url: "/project",
    method: "get",
    params,
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
