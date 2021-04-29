import request from './request'

/**
 * 获取板块列表
 * @param {Objcect} data 
 */
export const getsectionListApi = data => request({ url: 'section/list', data, })

/**
 * 获取当前账号信息
 * @param {*} data 
 * @returns 
 */
export const getCurAccountInfo = data => request({ url: '/api/agent/v1/api/profile/detail', data, })
