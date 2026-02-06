import service from "@/utils/api";

// 获取项目规格列表
export function getSpecListAPI(params) {
  return service({
    url: "/spec",
    method: "get",
    params,
  });
}
export function getBrandListAPI(params) {
  return service({
    url: "/brand",
    method: "get",
    params,
  });
}
export function getSkuListAPI(params) {
  return service({
    url: "/sku",
    method: "get",
    params,
  });
}


// 创建项目
export function CreateProjectSpecAPI(data) {
  return service({
    url: "/project",
    method: "post",
    data,
  });
}
