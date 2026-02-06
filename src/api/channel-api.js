import service from "@/utils/api";

export function createProjectAPI(data) {
  return service({
    url: "/channel/project",
    method: "post",
    data,
  });
}


export function updateProjectAPI(data) {
  return service({
    url: "/channel/project",
    method: "put",
    data,
  });
}

export function getProjectListAPI(params) {
  return service({
    url: "/channel/project",
    method: "get",
    params,
  });
}


// 获取项目产品列表
export function getProjectProductListAPI(params) {
  return service({
    url: `/channel/project/product`,
    method: "get",
    params,
  });
}


export function updateProductAPI(data) {
  return service({
    url: `/channel/project/product`,
    method: "put",
    data,
  });
}


export function createProjectProductApi(data) {
  return service({
    url: `/channel/project/product`,
    method: "post",
    data,
  });
}
