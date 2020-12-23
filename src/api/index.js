import http from "@/plugins/axios";

export default {
  login: params => http.post("/consumer/login", params),
  queryTypeList: () => http.get("/model/model/type/list"),
  queryTypePageList: params => http.get("/model/model/type/page/list", params),
  deleteTypeById: params => http.delete("/model/model/type/delete", params),
  addTypeData: params => http.post("/model/model/type/insert", params),
  getDimensionList: params =>
    http.get("/model/modelDimension/getDimensionList", params),
  delDimension: params =>
    http.get("/model/modelDimension/delDimension", params),
  getDimensionBatch: params =>
    http.get("/model/modelDimension/getDimensionBatch", params),
  getDimension: params =>
    http.get("/model/modelDimension/getDimension", params),
  addDimension: params =>
    http.post("/model/modelDimension/addDimension", params),
  checkByName: params => http.get("/model/modelDimension/checkByName", params),
  updateDimension: params =>
    http.post("/model/modelDimension/updateDimension", params),
  getDataBaseList: params =>
    http.get("/model/modelDatabase/getDataBaseList", params),
  getFields: params => http.get("/model/modelDatabase/getFields", params),
  getTabs: params => http.get("/model/modelDatabase/getTabs", params),
  testDataBase: params => http.get("/model/modelDatabase/testDataBase", params),
  getSymbolList: params => http.get("/model/symbol/list", params),
  startJob: params => http.post("/model/task/startJob", params),
  pauseJob: params => http.post("/model/task/pauseJob", params),
  resumeJob: params => http.post("/model/task/resumeJob", params),
  deleteJob: params => http.post("/model/task/deleteJob", params),
  modifyJobCron: params => http.post("/model/task/modifyJobCron", params)
};
