import CryptoJS from "crypto-js";

/**
 * DataURL转file
 * @param {base64} dataurl 文件的base64编码
 * @param {String} filename 文件名
 */
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 *  图片file转base64字符串
 */
function getBase64(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}
/**
 * 针对后台返回的地址做切割，非通用
 * @param {String} path 返回的地址
 */
function getDocName(path) {
  const name_split = path.split("/");
  const file_split = name_split[name_split.length - 1].split("_");
  return file_split[file_split.length - 1];
}

/**
 * 只能输入正数并且只有一位小数
 * @param {Number|String} val
 */
function isPositiveNum(val) {
  let regExp = /^(([1-9]\d*)|\d)(\.\d{0,1})?$/;
  return regExp.test(val) ? true : false;
}

/**
 * 对hybase返回的数据进行替换
 * @param {*} string
 */
function hybaseEscapeReplace(string) {
  const escape = {
    IMAGE: "img",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
    "&quot;": '"',
    "&amp;lt;": "<!",
    "&amp;gt;": ">",
    "&amp;nbsp;": " ",
    "&amp;quot;": '"',
    "\n": "<br/>"
  };
  let matcher = new RegExp(Object.keys(escape).join("|"), "g");
  let result = string.replace(matcher, function(match) {
    return escape[match];
  });
  return result;
}

/**
 * 判断数组是否相等
 * @param {*} first
 * @param {*} second
 */
function arrayEquals(first, second) {
  if (!(first || second)) {
    return false;
  }
  // 先比较长度
  if (first.length != second.length) return false;

  first = first.sort();
  second = second.sort();

  for (var i = 0, l = first.length; i < l; i++) {
    // 检查是否为内嵌数组
    if (first[i] instanceof Array && second[i] instanceof Array) {
      if (!arrayEquals(first[i], second[i])) return false;
    } else if (first[i] !== second[i]) {
      return false;
    }
  }
  return true;
}

/**
 * CryptoJS加密
 * @param {String} key 加密的key
 * @param {String} value 加密的值
 */
function setEncryption(key, value) {
  const _key = CryptoJS.enc.Latin1.parse(key);
  const iv = CryptoJS.enc.Latin1.parse(key);
  let data = CryptoJS.enc.Latin1.parse(value);
  const encrypted = CryptoJS.AES.encrypt(data, _key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return encrypted.toString();
}

/**
 * 数组排序
 * @param {Array} array 排序的数组
 * @param {String} attr 排序的字段
 */

/**
 * 过滤
 */
function hasPermission(target, resourceArray) {
  let isHavePermission = false;
  let sources;
  if (!resourceArray) {
    sources = sessionStorage.getItem("resource");
    resourceArray = sources && JSON.parse(sources);
  }
  if (resourceArray) {
    for (let urlObj in resourceArray) {
      let resourceExists = resourceArray[urlObj];
      if (resourceExists) {
        if (resourceExists.path === target) {
          isHavePermission = true;
        } else if (resourceExists.children) {
          isHavePermission = this.hasPermission(
            target,
            resourceExists.children
          );
        }
        if (isHavePermission) {
          return true;
        }
      }
    }
  }
  return false;
}

function sortByAttribute(array, attr) {
  if (!attr) {
    return array;
  }
  return array && array.length > 1
    ? array.sort((v1, v2) => v1[attr] - v2[attr])
    : array;
}

const TYPE_ARRAY = [
  "Function",
  "String",
  "Number",
  "Boolean",
  "Array",
  "Object"
];
let TYPE = {};
TYPE_ARRAY.map(
  name =>
    (TYPE["is" + name] = item =>
      toString.call(item) === "[object " + name + "]")
);
TYPE.isUndefined = function(value) {
  return value === void 0;
};

function _identity(value) {
  return value;
}

function _creatIterator(iteratee, context) {
  if (iteratee == null) {
    return _identity;
  }
  if (TYPE.isFunction(iteratee)) {
    return _optimizeCb(iteratee, context);
  }
}

function _optimizeCb(func, context) {
  if (context == void 0) {
    return func;
  }
  return function(value, index, obj) {
    return func.call(context, value, index, obj);
  };
}

function _iterator(array, iteratee, context) {
  let children;
  let result = [];
  let item;
  if (array && array.length > 0) {
    for (let idx = 0; idx < array.length; idx++) {
      item = array[idx];
      item = iteratee(item, idx, context);
      if (item) {
        children = item.children;
        if (children && children.length > 0) {
          item.children = _iterator(children, iteratee, context);
        }
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * filter
 * @param array [Array] 遍历的数组
 * @param field [String|Array] 要返回的字段
 * @param context [any] 上下文对象
 */
function customMap(array, fields, context) {
  let result = {};

  if (!TYPE.isArray(fields)) {
    fields = [fields];
  }

  let cb = function(value) {
    if (TYPE.isObject(value)) {
      fields.map(fieldItem => {
        result[fieldItem] = value[fieldItem];
      });
    }
    return result;
  };
  const iteratee = _creatIterator(cb);
  return _iterator(array, iteratee, context);
}

/**
 * 根据传入的值递归过滤掉特定的元素
 * @param array [Array] 遍历的数组
 * @param filter [String|Array] 需要过滤的数组元素
 * @param field [String] 数组中的对比项
 * @param context [any] 上下文对象
 */
function customFilter(array, filter, field, context) {
  array = sortByAttribute(array, "sort");
  let cb = function(value) {
    if (TYPE.isObject(value)) {
      if (filter.indexOf(value[field]) === -1) {
        return value;
      } else {
        return false;
      }
    }
  };
  const iteratee = _creatIterator(cb);
  return _iterator(array, iteratee, context);
}

/**
 * 对于非constant文件夹中的格式化写在这里
 * 非筛选类型
 */
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
function formatDate(date, fmt) {
  if (!date) return "";
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
/**
 * 根据传入值返回符合条件的所有项，返回的是扁平数组
 * @param {*} array 遍历的数组
 * @param {Function} 回调函数
 * @param {*} context 上下文
 */
function customFilterTrue(array, cb, context) {
  const iteratee = _creatIterator(cb);
  return _iterator(array, iteratee, context);
}

function getBreadcrumb(array, path) {
  let result = [];
  function handler(array, path) {
    array.forEach(item => {
      if (path.indexOf(item.path) > -1) {
        result.push({ label: item.name, path: item.path });
        if (item.children && item.children.length > 0)
          handler(item.children, path);
      }
    });
  }

  if (array.length === 0 || path === "") return result;
  handler(array, path);
  return result;
}

/**
 * 手机号码隐藏中间四位
 * @param {*} number 手机号码
 */
function omitPhoneNum(number) {
  return number.slice(0, 3) + "****" + number.slice(7, 11);
}

export {
  TYPE,
  dataURLtoFile,
  hybaseEscapeReplace,
  getDocName,
  isPositiveNum,
  sortByAttribute,
  setEncryption,
  customMap,
  customFilter,
  hasPermission,
  arrayEquals,
  getBreadcrumb,
  customFilterTrue,
  getBase64,
  omitPhoneNum,
  padLeftZero,
  formatDate
};
