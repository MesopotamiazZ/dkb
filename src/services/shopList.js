import request from './request';

/**
 * 获取所有店铺
 * @param {*} data 
 * @returns 
 */
export const getAllShop = data => request({
  url: 'Core/Shop/getAll',
  method: 'get',
  params: { ...data }
})

/**
 * 查询套餐
 * @param {*} data 
 * @returns 
 */
export const searchPackage = data => request({
  url: '/Core/Shop/getPlan',
  method: 'get',
  params: { ...data }
})

/**
 * 品类查询
 * @param {*} data 
 * @returns 
 */
export const getCategory = data => request({
  url: '/Core/Shop/getIndustry',
  method: 'get',
  params: { ...data }
})

/**
 * 节点查询
 * @param {*} data 
 * @returns 
 */
export const getNode = data => request({
  url: '/Core/Shop/getNode',
  method: 'get',
  params: { ...data }
})

/**
 * 套餐补差价计算
 * @param {*} data 
 * @returns 
 */
export const getPackageDiff = data => request({
  url: '/Core/Shop/getDiff',
  method: 'get',
  params: { ...data }
})

/**
 * 创建店铺
 * @param {*} data 
 * @returns 
 */
export const createShop = data => request({
  url: '/Core/Shop/add',
  method: 'post',
  data
})

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