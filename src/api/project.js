import service from "@/utils/api";

// 创建项目
export function Project(data) {
  return service({
    url: "/project",
    method: "post",
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

// 创建项目
export function createProjectApi(channelID, data) {
  return service({
    url: `/channel/${channelID}/project`,
    method: "post",
    data,
  });
}
// 获取项目列表
export function getProjectListApi(channelID, params) {
  return service({
    url: `/channel/${channelID}/project`,
    method: "get",
    params,
  });
}
// 更新项目
export function updateProjectApi(channelID, projectID, data) {
  return service({
    url: `/channel/${channelID}/project/${projectID}`,
    method: "put",
    data,
  });
}

// 创建项目产品
export function createProjectProductApi(channelID, projectID, data) {
  return service({
    url: `/channel/${channelID}/project/${projectID}/product`,
    method: "post",
    data,
  });
}
// 获取项目产品列表
export function getProjectProductListApi(channelID, projectID) {
  return service({
    url: `/channel/${channelID}/project/${projectID}/product`,
    method: "get",
  });
}
// 更新项目产品
export function updateProjectProductApi(channelID, projectID, productID, data) {
  return service({
    url: `/channel/${channelID}/project/${projectID}/product/${productID}`,
    method: "put",
    data,
  });
}
