import request from './request'

/**
 * 登录
 * @param {Object} data 
 */
export const loginApi = data => request({
  url: '/Core/User/login',
  method: 'post',
  data
})

/**
 * 发送验证码
 * @param {*} data 
 * @returns 
 */
export const sendSms = data => request({
  url: '/Publics/Tools/sendsms',
  method: 'post',
  data
})

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const registerApi = data => request({
  url: '/Core/User/add',
  method: 'post',
  data
})

