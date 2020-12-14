import axios from "axios";
import qs from "qs";
import { TYPE } from "@/utils/utils";
import { message } from "ant-design-vue";

const utils = require("axios/lib/utils");
const normalizeHeaderName = require("axios/lib/helpers/normalizeHeaderName");

function errorShow(data) {
  let error_msg = {
    "101": "重复登录",
    "102": "密码错误",
    "103": "验证码不通过",
    "104": "该用户不存在",
    "110": "状态异常",
    "111": "系统异常",
    "120": "权限不够",
    "130": "验证未通过",
    "140": "未查询到数据",
    "150": "缺失必填参数",
    "160": "程序正在运行中",
    "170": "事件个数达到限额",
    "200": "有重复数据",
    "210": "该消息已被指派",
    "220": "暂停事件不能上大屏",
    "300": "访问成功，结果非预期结果",
    "401": "token未携带"
  };
  if (Object.prototype.hasOwnProperty.call(error_msg, data.status)) {
    message.error(error_msg[data.status]);
  } else {
    message.error(data.message || data.msg);
  }
}

function setContentType(headers, value) {
  if (TYPE.isObject(headers)) {
    headers["Content-Type"] = value;
  }
}

// 基础地址前缀
const baseURL = "";

const instance = axios.create({
  baseURL,
  crossDomain: true,
  withCredentials: true, //跨域请求携带cookie，服务端Access-Control-Allow-Origin跨域设置不能为*，同时需要开启Access-Control-Allow-Credentials
  timeout: 20000, // 请求超时时间
  transformRequest: [
    function(data, headers) {
      normalizeHeaderName(headers, "Content-Type");

      if (
        utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }

      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }

      if (utils.isURLSearchParams(data)) {
        setContentType(
          headers,
          "application/x-www-form-urlencoded;charset=utf-8"
        );
        return data.toString();
      }

      if (data instanceof Object) {
        // post请求下，服务端需要接收List<Object>集合（一般是批量添加对象功能）时，需要从body中拿数据，而不是从headers拿，因此需要以json形式进行传输
        if (data.emulateJSON) {
          delete data.emulateJSON;
          //此处的emulateJSON属性，是在请求参数里加进去的，具体可参照/src/views/config/score.vue的confirmAdd()方法中的请求方式进行处理
          setContentType(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }

        // 正常情况下，以表单形式传数据，服务端从headers拿数据
        setContentType(
          headers,
          "application/x-www-form-urlencoded;charset=utf-8"
        );
        return qs.stringify({ ...data });
      }

      return data;
    }
  ]
});

instance.interceptors.request.use(
  config => {
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _: new Date().getTime()
      };
    }
    /*eslint no-console:0 */
    //配置反向代理请求处理
    if (config.wxProxy) {
      config.baseURL = process.env.VUE_APP_FTP_URL;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (
      response.headers &&
      response.headers["content-disposition"]?.indexOf("attachment") > -1
    ) {
      return response;
    }
    const { data: dataBody } = response;

    if (
      dataBody.status === undefined &&
      Object.prototype.hasOwnProperty.call(dataBody, "code")
    )
      dataBody.status = dataBody.code;
    switch (dataBody.status) {
      case 200:
        return Promise.resolve(dataBody);
      case 401:
        errorShow(dataBody);
        return Promise.reject(dataBody);
      default:
        errorShow(dataBody);
        return Promise.reject(dataBody);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
