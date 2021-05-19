import request from './request';

// ==================== 员工 ====================
/**
 * 创建员工
 * @param {*} data 
 * @returns 
 */
export const addStaff = data => request({
  url: '/Setting/Staff/add',
  method: 'post',
  data
})

/**
 * 更新员工
 * @param {*} data 
 * @returns 
 */
export const updateStaff = data => request({
  url: '/Setting/Staff/update',
  method: 'post',
  data
})

/**
 * 删除员工
 * @param {*} data 
 * @returns 
 */
export const removeStaff = data => request({
  url: '/Setting/Staff/delete',
  method: 'post',
  data
})

/**
 * 查询员工详情
 * @param {*} data 
 * @returns 
 */
export const getStaffDetail = data => request({
  url: '/Setting/Staff/get',
  method: 'get',
  params: { ...data }
})

// ===================== 角色 ==================

/**
 * 角色列表
 * @param {*} data 
 * @returns 
 */
export const getRoleList = data => request({
  url: '/Setting/Role/getList',
  method: 'get',
  params: { ...data }
})

/**
 * 获取权限集
 * @param {*} data 
 * @returns 
 */
export const getRoleAuth = data => request({
  url: '/Setting/Role/getAuth',
  method: 'get',
  params: { ...data }
})

/**
 * 查询角色详情
 * @param {*} data 
 * @returns 
 */
export const getRoleDetail = data => request({
  url: '/Setting/Role/get',
  method: 'get',
  params: { ...data }
})

/**
 * 新建角色
 * @param {*} data 
 * @returns 
 */
export const addRole = data => request({
  url: '/Setting/Role/add',
  method: 'post',
  data
})

/**
 * 更新角色
 * @param {*} data 
 * @returns 
 */
export const updateRole = data => request({
  url: '/Setting/Role/update',
  method: 'post',
  data
})

/**
 * 删除角色
 * @param {*} data 
 * @returns 
 */
export const removeRole = data => request({
  url: '/Setting/Role/delete',
  method: 'post',
  data
})

// ======================操作日志=====================
/**
 * 删除角色
 * @param {*} data 
 * @returns 
 */
export const clearAllLog = data => request({
  url: '/Setting/Log/delete',
  method: 'post',
  data
})