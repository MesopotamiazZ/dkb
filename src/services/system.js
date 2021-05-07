import request from './request';

// ============ 快速配送 =============
/**
 * 快速配送模板新建
 * @param {*} data 
 * @returns 
 */
export const addExpress = data => request({
  url: '/Setting/Express/add',
  method: 'post',
  data
})

/**
 * 删除~~~
 * @param {*} data 
 * @returns 
 */
export const delExpress = data => request({
  url: '/Setting/Express/delete',
  method: 'post',
  data
})


/**
 * 更新~~~
 * @param {*} data 
 * @returns 
 */
export const updateExpress = data => request({
  url: '/Setting/Express/update',
  method: 'post',
  data
})

/**
 * 快速配送开关查询
 * @param {*} data 
 * @returns 
 */
export const toogleExpress = data => request({
  url: '/Setting/Express/getSetting',
  method: 'get',
  params: { ...data }
})

/**
 * 快速配送开关更新
 * @param {*} data 
 * @returns 
 */
export const updateToogleExpress = data => request({
  url: '/Setting/Express/updateSetting',
  method: 'post',
  data
})

/**
 * 查询快速配送详情
 * @param {*} data 
 * @returns 
 */
export const getExpressDetail = data => request({
  url: '/Setting/Express/get',
  method: 'get',
  params: { ...data }
})

// ============ 门店自提 =============

/**
 * 新建门店
 * @param {*} data 
 * @returns 
 */
export const addStore = data => request({
  url: '/Setting/Stores/add',
  method: 'post',
  data
})

/**
 * 删除~~~
 * @param {*} data 
 * @returns 
 */
export const delStore = data => request({
  url: '/Setting/Stores/delete',
  method: 'post',
  data
})


/**
 * 更新~~~
 * @param {*} data 
 * @returns 
 */
export const updateStore = data => request({
  url: '/Setting/Stores/update',
  method: 'post',
  data
})

/**
 * 门店自提开关查询
 * @param {*} data 
 * @returns Store
 */
export const toogleStore = data => request({
  url: '/Setting/Stores/getSetting',
  method: 'get',
  params: { ...data }
})

/**
 * 门店自提开关更新
 * @param {*} data 
 * @returns 
 */
export const updateToogleStore = data => request({
  url: '/Setting/Stores/updateSetting',
  method: 'post',
  data
})

/**
 * 查询快速配送详情
 * @param {*} data 
 * @returns 
 */
export const getStoreDetail = data => request({
  url: '/Setting/Stores/get',
  method: 'get',
  params: { ...data }
})

// ============= 地址库 ==============

/**
 * 新建地址库
 * @param {*} data 
 * @returns 
 */
export const addAddress = data => request({
  url: '/Setting/AddLib/add',
  method: 'post',
  data
})

/**
 * 删除~~~
 * @param {*} data 
 * @returns 
 */
export const delAddress = data => request({
  url: '/Setting/AddLib/delete',
  method: 'post',
  data
})


/**
 * 更新~~~
 * @param {*} data 
 * @returns 
 */
export const updateAddress = data => request({
  url: '/Setting/AddLib/update',
  method: 'post',
  data
})

/**
 * 地址库详情
 * @param {*} data 
 * @returns 
 */
export const getAddressDetail = data => request({
  url: '/Setting/AddLib/get',
  method: 'get',
  params: { ...data }
})

// =============== 同城配送 =================

/**
 * 同城开关查询
 * @param {*} data 
 * @returns Store
 */
export const toogleSameCity = data => request({
  url: '/Setting/LocalExp/getSetting',
  method: 'get',
  params: { ...data }
})

/**
 * 同城开关更新
 * @param {*} data 
 * @returns 
 */
export const updateToogleSameCity = data => request({
  url: '/Setting/LocalExp/updateSetting',
  method: 'post',
  data
})
