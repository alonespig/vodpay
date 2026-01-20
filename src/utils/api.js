import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8088",
  timeout: 5000,
});

service.interceptors.response.use(
  // 成功响应（HTTP 层 2xx）
  (res) => {
    const data = res.data;

    // 业务失败（但 HTTP 是 200）
    if (data.code !== 200) {
      // 这里一定要 reject
      return Promise.reject(data);
    }

    // 统一剥壳
    return data.data;
  },

  // HTTP 层失败（4xx / 5xx / 网络错误）
  (error) => {
    // 网络错误（连 response 都没有）
    if (!error.response) {
      console.error("网络异常");
    } else {
      const status = error.response.status;

      if (status === 401) {
        console.error("未登录 / token 失效");
        // 比如跳转登录页
      } else if (status === 403) {
        console.error("无权限");
      } else if (status >= 500) {
        console.error("服务器错误");
      }
    }

    return Promise.reject(error);
  },
);

export default service;
