import request from './request'

/**
 * 新增代客下单订单
 * @param {Object} data 
 */
export const addInsteadOrder = data => request({
  url: '/Order/SoManage/add',
  method: 'post',
  data
})

/**
 * 分类列表
 * @param {*} data 
 * @returns 
 */
export const getCategoryList = data => request({
  url: '/Goods/MdseClass/getList',
  method: 'get',
  params: { ...data }
})

/**
 * 筛选列表 文字
 * @param {*} data 
 * @returns 
 */
export const getProductListText = data => request({
  url: '/Goods/MdseManage/getListText',
  method: 'get',
  params: { ...data }
})

/**
 * 筛选列表 图片
 * @param {*} data 
 * @returns 
 */
export const getProductListImg = data => request({
  url: '/Goods/MdseManage/getListText',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data
})

/**
 * sku查询
 * @param {*} data 
 * @returns 
 */
export const getProductSkuInfo = data => request({
  url: '/Goods/MdseManage/getSku',
  method: 'get',
  params: { ...data }
})

/**
 * 订单费用计算
 * @param {*} data 
 * @returns 
 */
export const calculateOrder = data => request({
  url: '/Order/SoManage/add',
  method: 'post',
  data
})

/**
 * 挂单或提交
 * @param {*} data 
 * @returns 
 */
export const hangUpAndSubmit = data => request({
  url: '/Order/SoManage/add',
  method: 'post',
  data
})

// =============== common ================
/**
 * 行政区域查询
 * @param {*} data 
 * @returns 
 */
export const getArea = data => request({
  url: '/Publics/Tools/getArea',
  method: 'get',
  params: { ...data }
})

/**
 * ocr图片识别
 * @param {*} data 
 * @returns 
 */
export const toOcr = data => request({
  url: '/Publics/Tools/toOcr',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data
})
