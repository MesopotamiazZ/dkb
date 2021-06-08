import axios from 'axios';
import { message } from 'antd'
import { BASE_URL, TIMEOUT } from "./config";


function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    method: config.method || 'post',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      token: `${localStorage.getItem('Dense-Diary-Authorization')}`,
      dkbid: `${localStorage.getItem('dkb-id')}`,
      // 'x-test': 1
    }
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    if (res.data.code === '403' || res.data.code === '401') {
      localStorage.removeItem("Dense-Diary-Authorization")
      message.warning('登录过期，请重新登录')
      window.location.replace('/#/login/')
    }
    if (res.data.code === '') {
      message.warning(res.data.msg);
    }
    return res.data
  })

  //请求拦截
  instance.interceptors.request.use((res) => {
    if (localStorage.getItem("Dense-Diary-Authorization") || !res.headers["Authorization"]) {
      res.headers["token"] = localStorage.getItem("Dense-Diary-Authorization")
    } else {
      //登录校验
      // if (!res.url.includes('/login')) {
      //   window.location.replace('/#/login')
      // }
    }
    return res
  }, (error) => {

    return Promise.reject(error)
  })

  // 捕获http状态码错误
  return new Promise((resolve, reject) => {
    instance(config).then(res => {
      resolve(res)
    }).catch(err => {
      if (err.response) {
        // 错误信息
        console.log(err.response);
        message.error(err?.response?.data?.msg)
      }
    })
  })
}

export default request;
