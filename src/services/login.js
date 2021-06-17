import request from './request'

/**
 * 登录
 * @param {Object} data 
 */
export const loginApi = data => request({
  url: '/Publics/User/login',
  method: 'post',
  data
})

/**
 * 发送验证码
 * @param {*} data 
 * @returns 
 */
export const sendSms = data => request({
  url: '/Publics/Tools/sendSms',
  method: 'post',
  data
})

/**
 * 注册
 * @param {*} data 
 * @returns 
 */
export const registerApi = data => request({
  url: '/Publics/User/add',
  method: 'post',
  data
})

/**
 * 重置密码
 * @param {*} data 
 * @returns 
 */
export const resetPassApi = data => request({
  url: '/Publics/User/rsPassword',
  method: 'post',
  data
})

