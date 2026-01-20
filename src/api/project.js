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
