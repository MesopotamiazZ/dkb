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
export const getCurAccountInfo = data => request({
  url: '/Publics/Tools/getUser',
  method: 'get',
  params: { ...data }
})

/**
 * 商户信息查询
 * @param {*} data 
 * @returns 
 */
export const getShopInfo = data => request({
  url: '/Publics/Shop/get',
  method: 'get',
  params: { ...data }
})
