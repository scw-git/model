import http from "@/plugins/axios";

export default {
  login: params => http.post("/consumer/login", params)
};
