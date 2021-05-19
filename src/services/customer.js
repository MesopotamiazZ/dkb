import request from './request';

/**
 * 创建客户
 * @param {*} data 
 * @returns 
 */
export const addCustomer = data => request({
  url: '/Scrm/CsrManage/add',
  method: 'post',
  data
})

/**
 * 更新客户
 * @param {*} data 
 * @returns 
 */
export const updateCustomer = data => request({
  url: '/Scrm/CsrManage/update',
  method: 'post',
  data
})

/**
 * 获取客户详情
 * @param {*} data 
 * @returns 
 */
export const getCustomerDetail = data => request({
  url: '/Scrm/CsrManage/get',
  method: 'get',
  params: { ...data }
})

/**
 * 新建客户等级
 * @param {*} data 
 * @returns 
 */
export const addCustomerLevel = data => request({
  url: '/Scrm/CsrLevel/add',
  method: 'post',
  data
})

/**
 * 新建客户等级
 * @param {*} data 
 * @returns 
 */
export const updateCustomerLevel = data => request({
  url: '/Scrm/CsrLevel/update',
  method: 'post',
  data
})

/**
 * 删除客户等级
 * @param {*} data 
 * @returns 
 */
export const delCustomerLevel = data => request({
  url: '/Scrm/CsrLevel/update',
  method: 'post',
  data
})

/**
 * 获取客户等级
 * @param {*} data 
 * @returns 
 */
export const getCustomerLevel = data => request({
  url: '/Scrm/CsrLevel/getList',
  method: 'get',
  params: { ...data }
})

/**
 * 获取客户等级详情
 * @param {*} data 
 * @returns 
 */
export const getCustomerLevelDetail = data => request({
  url: '/Scrm/CsrLevel/get',
  method: 'get',
  params: { ...data }
})

// =======================客户标签========================
/**
 * 获取客户标签
 * @param {*} data 
 * @returns 
 */
export const getCustomerTag = data => request({
  url: '/Scrm/CsrTag/getList',
  method: 'get',
  params: { ...data }
})

/**
 * 新建客户标签
 * @param {*} data 
 * @returns 
 */
export const addCustomerTag = data => request({
  url: '/Scrm/CsrTag/add',
  method: 'post',
  data
})

/**
 * 修改客户标签
 * @param {*} data 
 * @returns 
 */
export const updateCustomerTag = data => request({
  url: '/Scrm/CsrTag/update',
  method: 'post',
  data
})

/**
 * 删除客户标签
 * @param {*} data 
 * @returns 
 */
export const removeCustomerTag = data => request({
  url: '/Scrm/CsrTag/delete',
  method: 'post',
  data
})

/**
 * 获取客户标签详情
 * @param {*} data 
 * @returns 
 */
export const getTagDetail = data => request({
  url: '/Scrm/CsrTag/get',
  method: 'get',
  params: { ...data }
})

// =========================储值规则=========================

/**
 * 新建储值规则
 * @param {*} data 
 * @returns 
 */
export const addVcRule = data => request({
  url: '/Scrm/VcRule/add',
  method: 'post',
  data
})

/**
 * 删除储值规则
 * @param {*} data 
 * @returns 
 */
export const removeVcRule = data => request({
  url: '/Scrm/VcRule/delete',
  method: 'post',
  data
})

/**
 * 更新储值规则
 * @param {*} data 
 * @returns 
 */
export const updateVcRule = data => request({
  url: '/Scrm/VcRule/update',
  method: 'post',
  data
})

/**
 * 储值规则详情
 * @param {*} data 
 * @returns 
 */
export const getVcRuleDetail = data => request({
  url: '/Scrm/VcRule/get',
  method: 'get',
  params: { ...data }
})

// ======================储值管理===================

/**
 * 新建储值调账
 * @param {*} data 
 * @returns 
 */
export const addVcMoneyDetail = data => request({
  url: '/Scrm/VcMoney/add',
  method: 'post',
  data
})

/**
 * 查询储值调账详情
 * @param {*} data 
 * @returns 
 */
export const getVcMoneyDetail = data => request({
  url: '/Scrm/VcMoney/get',
  method: 'get',
  params: { ...data }
})