export default {
  // 验证长度
  lengthValidate: (rule, value, callback) => {
    let len = value.length;
    if (this.max && this.min && (len > this.max || len < this.min)) {
      callback(
        new Error("长度应在" + this.min + "到" + this.max + "个字符之间")
      );
    } else if (this.mix && len < this.min) {
      callback({ message: "长度必须要大于" + this.min + "个字符" });
    } else if (this.max && len > this.max) {
      callback({ message: "长度必须要小于" + this.max + "个字符" });
    } else {
      callback();
    }
  },

  // 邮箱验证
  emailValidate: (rule, value, callback) => {
    const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (value) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请填写正确的邮箱地址"));
      }
    } else {
      callback();
    }
  },

  // URL验证
  urlValidate: (rule, value, callback) => {
    const reg = /[a-zA-z]+:\/\/[^\s]*/;
    if (value) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请填写正确的URL地址"));
      }
    } else {
      callback();
    }
  },

  // 手机验证
  phoneValidate: (rule, value, callback) => {
    const reg = /^1[3456789]\d{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请填写正确的手机号码"));
    }
  },

  // 固话验证
  telphoneValidate: (rule, value, callback) => {
    const reg = /\d{3}-\d{8}|\d{4}-\{7,8}/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请填写正确的单位电话 格式:020-12345678"));
    }
  },

  // 身份证验证
  idCardValidate: (rule, value, callback) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请填写正确的身份证"));
    }
  },

  // 判断非空
  isEmpty: (rule, value, callback) => {
    if (!value) {
      callback(new Error("该项为必填项"));
    } else {
      callback();
    }
  },
  // 非负数
  noNegativeNumber: (rule, value, callback) => {
    const reg = /^(0\.?\d{0,2}|[1-9]\d*\.?\d{0,10})$/;
    if (value != "") {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请填写非负数"));
      }
    } else {
      callback();
    }
  },
  // 是否是一个地址
  isURL: url => {
    const strRegex =
      "^((https|http|ftp)://)?" + //(https或http或ftp):// 可有可无
      "(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + //ftp的user@ 可有可无
      "(([0-9]{1,3}\\.){3}[0-9]{1,3}" + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
      "|" + // 允许IP和DOMAIN（域名）
      "(localhost)|" + //匹配localhost
      "([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
      "\\w+\\." + // 一级域名 -英文或数字 加上.
      "[a-zA-Z]{1,6})" + // 顶级域名- 1-6位英文
      "(:[0-9]{1,5})?" + // 端口- :80 ,1-5位数字
      "((/?)|" + // url无参数结尾 - 斜杆或这没有
      "(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符
    const re = new RegExp(strRegex, "i"); // 大小写不敏感
    return re.test(encodeURI(url));
  }
};
