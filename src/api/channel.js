import service from "@/utils/api";

export function createChannel(data) {
  return service({
    url: "/channel",
    method: "post",
    data,
  });
}

export function updateChannel(data) {
  return service({
    url: "/channel",
    method: "put",
    data,
  });
}

export function getChannels() {
  return service({
    url: "/channel",
    method: "get",
  });
}

export function getChannelAPI() {
  return service({
    url: "/channel",
    method: "get",
  });
}


export function addSupplierProductToProjectProductApi(data) {
  return service({
    url: "/product",
    method: "post",
    data,
  });
}

// 获取 supplier_channel 下的所有 product
export function getProductsAPI() {
  return service({
    url: `/product`,
    method: "get",
  });
}
