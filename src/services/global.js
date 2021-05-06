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
export const getCurAccountInfo = data => request({ url: '/Publics/Tools/getUser', data, method: 'get' })

/**
 * 商户信息查询
 * @param {*} data 
 * @returns 
 */
export const getShopInfo = data => request({
  url: '/Core/Shop/getConfig',
  method: 'get',
  params: { ...data }
})

/**
 * 附件上传
 * @param {*} data 
 * @returns 
 */
export const getUploadToken = data => request({
  url: '/Publics/Tools/getUpToken',
  method: 'get',
  params: { ...data }
})