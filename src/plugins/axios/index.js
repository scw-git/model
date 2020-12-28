import axios from "axios";
import qs from "qs";
import { TYPE } from "@/utils/utils";
import { message } from "ant-design-vue";

const utils = require("axios/lib/utils");
const normalizeHeaderName = require("axios/lib/helpers/normalizeHeaderName");

function errorShow(data) {
  let error_msg = {
    101: "重复登录",
    102: "密码错误",
    103: "验证码不通过",
    104: "该用户不存在",
    110: "状态异常",
    111: "系统异常",
    120: "权限不够",
    130: "验证未通过",
    140: "未查询到数据",
    150: "缺失必填参数",
    160: "程序正在运行中",
    170: "事件个数达到限额",
    200: "有重复数据",
    210: "该消息已被指派",
    220: "暂停事件不能上大屏",
    300: "访问成功，结果非预期结果",
    401: "token未携带",
  };
  if (Object.prototype.hasOwnProperty.call(error_msg, data.status)) {
    message.error(error_msg[data.status]);
  } else {
    message.error(data.message || data.msg);
  }
}

function setContentType(headers, value) {
  if (TYPE.isObject(headers)) {
    //获取headers对象下的 Content-Type属性。因为对象的key是字符串，所以要加引号。变量不用，但变量的值也是字符串
    //对象的属性名一定是字符串，属性值任意值
    headers["Content-Type"] = value; //headers对象下Content-Type属性等于value
  }
}

// 基础地址前缀
const baseURL = "";

const instance = axios.create({
  baseURL,
  crossDomain: true,
  withCredentials: true, //跨域请求携带cookie，服务端Access-Control-Allow-Origin跨域设置不能为*，同时需要开启Access-Control-Allow-Credentials
  timeout: 20000, // 请求超时时间
  /**
   * 允许向服务器发送前，修改请求数据
   * 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
   * 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
   */
  transformRequest: [
    function (data, headers) {
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
        setContentType(headers, "application/x-www-form-urlencoded;charset=utf-8");
        return data.toString();
      }

      if (data instanceof Object) {
        //post 提交数据放在body中，get放在URL中
        // post请求下，服务端需要接收List<Object>集合（一般是批量添加对象功能）时，需要从body中拿数据，而不是从headers拿，因此需要以json形式进行传输
        if (data.emulateJSON) {
          delete data.emulateJSON;
          //此处的emulateJSON属性，是在请求参数里加进去的，具体可参照/src/views/config/score.vue的confirmAdd()方法中的请求方式进行处理
          setContentType(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }

        // 正常情况下，以表单形式传数据，服务端从headers拿数据
        setContentType(headers, "application/x-www-form-urlencoded;charset=utf-8");
        //axios是以JSON格式发送数据的，如果是对象，要用qs转一下
        return qs.stringify({ ...data });
      }

      return data;
    },
  ],
});

//拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.params = {
        ...config.params,//这个参数本来就有的，类似于 a = a + 1
        _: new Date().getTime(),//加了一个时间戳,可能是处理缓存问题。如果同一个请求，参数没有变。可能会返回304
      };
    }
    /*eslint no-console:0 */
    //配置反向代理请求处理
    if (config.wxProxy) {
      config.baseURL = process.env.VUE_APP_FTP_URL;
    }
    // console.log('request', config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (
      response.headers &&
      response.headers["content-disposition"]?.indexOf("attachment") > -1
    ) {
      return response;
    }
    // dataBody相当于data的别名
    const { data: dataBody } = response;
    console.log("dataBody", dataBody);
    console.log("response", response);
    /*eslint no-console:0 */

    if (
      dataBody.status === undefined &&
      Object.prototype.hasOwnProperty.call(dataBody, "code")//表示dataBody自身的code属性，不会去原型上找
    )
      dataBody.status = dataBody.code;
    switch (dataBody.status) {
      case 1:
        return Promise.resolve(dataBody);
      case 0:
        errorShow(dataBody);
        return Promise.reject(dataBody);
      default:
        errorShow(dataBody);
        return Promise.reject(dataBody);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
