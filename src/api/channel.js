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
