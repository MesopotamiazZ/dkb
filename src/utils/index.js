/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-redeclare */
/*
 * @Author: nowThen
 * @Date: 2019-08-14 16:14:30
 */
import {
  useLocation,
} from 'react-router-dom';
import moment from 'moment';

const isDev = process.env.NODE_ENV === 'development'; // 开发 or 生产

// 匹配接口前缀
export function autoMatch(prefix) {
  let baseUrl = '';
  if (isDev) {
    // 开发环境 通过proxy配置转发请求；
    baseUrl = `/${prefix || 'testapi'}`;
  } else {
    // 生产环境 根据实际配置 根据 prefix 匹配url;
    // 配置来源 根据实际应用场景更改配置。(1.从全局读取；2.线上配置中心读取)
    // switch (prefix) {
    //   case 'baidu':
    //     baseUrl = window.LOCAL_CONFIG.baidu;
    //     break;
    //   case 'alipay':
    //     baseUrl = window.LOCAL_CONFIG.alipay;
    //     break;
    //   default:
    //     baseUrl = window.LOCAL_CONFIG.default;
    // }
  }
  return baseUrl;
}

export function checkStatus(response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  }
  let errorInfo = '';
  switch (status) {
    case -1:
      errorInfo = '远程服务响应失败,请稍后重试';
      break;
    case 400:
      errorInfo = '400：错误请求';
      break;
    case 401:
      errorInfo = '401：访问令牌无效或已过期';
      break;
    case 403:
      errorInfo = '403：拒绝访问';
      break;
    case 404:
      errorInfo = '404：资源不存在';
      break;
    case 405:
      errorInfo = '405：请求方法未允许';
      break;
    case 408:
      errorInfo = '408：请求超时';
      break;
    case 500:
      errorInfo = '500：访问服务失败';
      break;
    case 501:
      errorInfo = '501：未实现';
      break;
    case 502:
      errorInfo = '502：无效网关';
      break;
    case 503:
      errorInfo = '503：服务不可用';
      break;
    default:
      errorInfo = '连接错误';
  }
  return {
    status,
    msg: errorInfo,
  };
}

/**
 * 行为验证
 * @returns 
 */
export function behaviorVerification() {
  return new Promise((resolve, reject) => {
    try {
      //方法1: 直接生成一个验证码对象。
      var captcha1 = new window.TencentCaptcha('2034169128', function (res) {
        resolve(res)
      });
      captcha1.show(); // 显示验证码
    } catch (err) {
      reject(err)
    }
  })
}

export function splitUrl(url) {
  const str = url.split('?')[1];
  const items = (str && str.split('&')) || [];
  let arr = {};
  const json = {};
  for (let i = 0; i < items.length; i++) {
    arr = items[i].split('=');
    json[arr[0]] = arr[1];
  }
  return json;
}

// 数字格式化成 123,456.00
export function parseNumber(num) {
  let newNum = '';
  let count = 0;
  let numStr = String(num);// 数字转为字符串;
  // 当字符串不含有小数点
  if (numStr.indexOf('.') === -1) {
    for (let i = numStr.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newNum = `${numStr.charAt(i)},${newNum}`;
      } else {
        newNum = numStr.charAt(i) + newNum;
      }
      count++;
    }
    numStr = `${newNum}`; // 自动补小数点后两位
    return numStr;
  }
  // 当字符串含有小数点
  for (let i = numStr.indexOf('.') - 1; i >= 0; i--) {
    if (count % 3 === 0 && count !== 0) {
      newNum = `${numStr.charAt(i)},${newNum}`;
    } else {
      newNum = numStr.charAt(i) + newNum; // 字符拼接
    }
    count++;
  }
  numStr = newNum + (`${numStr}00`).substr((`${numStr}00`).indexOf('.'), 3);
  return numStr;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// antd form 验证手机号
export function validatorPhone() {
  return {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机格式不正确',
  };
}

// 验证邮箱
export function validatorEmail() {
  return {
    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    message: '邮箱格式不正确',
  };
}

// 验证正数
export function validatorPositiveNumber() {
  return {
    pattern: /^[0-9]+.?[0-9]*$/,
    message: '请填写正确的数值'
  }
}

/**
 * stringZero numberZero isEqual
 */
export function isStrNumZero(target) {
  if (target === 0 || target === '0') return true;
  return false;
}

/**
 * 获取当月的天数数组
 * @returns 
 */
export function getMonthDays(year, month) {
  var date = new Date();
  var year = year || date.getFullYear();
  var month = month || date.getMonth() + 1;
  var lastDay = new Date(year, month, 0).getDate()//获得是标准时间,需要getDate()获得天数
  const arr = new Array(lastDay).fill('');
  return {
    days: lastDay, dayArr: arr.map((item, index) => (
      `${index + 1}日`
    ))
  }
}

/**
   * 格式化筛选数据
   */
export const parseFilterValue = (values) => {
  let obj = {}
  for (let key in values) {
    if (values[key]) {
      if (key === 'date') {
        obj.start_time = moment(values[key][0]).valueOf();
        obj.end_time = moment(values[key][1]).valueOf();
      } else {
        obj[key] = values[key];
      }
    }
  }
  return obj;
}