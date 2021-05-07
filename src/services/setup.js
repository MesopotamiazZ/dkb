import request from './request';

/**
 * 基本设置查询
 * @param {*} data 
 * @returns 
 */
export const getBaseSet = data => request({
  url: '/Setting/Basic/getInfo',
  method: 'get',
  params: data
})

/**
 * 基本设置更新
 * @param {*} data 
 * @returns 
 */
export const updateBaseSet = data => request({
  url: '/Setting/Basic/updateInfo',
  method: 'post',
  data
})

/**
 * 商户品类
 * @param {*} data 
 * @returns 
 */
export const getIndustry = data => request({
  url: '/Core/Shop/getIndustry',
  method: 'get',
  params: data
})


