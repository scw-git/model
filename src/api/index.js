import http from "@/plugins/axios";

export default {
  login: params => http.post("/consumer/login", params),
  queryTypeList: () => http.get("/model/model/type/list"),
  queryTypePageList: params => http.get("/model/model/type/page/list", params),
  deleteTypeById: params => http.delete("/model/model/type/delete", params),
  addTypeData: params => http.post("/model/model/type/insert", params)
};
