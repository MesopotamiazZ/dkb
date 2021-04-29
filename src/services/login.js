import request from './request'

/**
 * 登录
 * @param {Object} data 
 */
export const loginApi = data => request({ url: '/api/agent/v1/api/login/login', method: 'post', data })