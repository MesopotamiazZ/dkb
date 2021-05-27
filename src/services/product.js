import request from './request';

// ====================商品分类====================
/**
 * 新建分类
 * @param {*} data 
 * @returns 
 */
export const addCategory = data => request({
  url: '/Goods/MdseClass/add',
  method: 'post',
  data
})

/**
 * 更新分类
 * @param {*} data 
 * @returns 
 */
export const updateCategory = data => request({
  url: '/Goods/MdseClass/update',
  method: 'post',
  data
})

/**
 * 删除分类
 * @param {*} data 
 * @returns 
 */
export const delCategory = data => request({
  url: '/Goods/MdseClass/delete',
  method: 'post',
  data
})

/**
 * 分类详情
 * @param {*} data 
 * @returns 
 */
export const getCategoryDetail = data => request({
  url: '/Goods/MdseClass/get',
  method: 'get',
  params: { ...data }
})

/**
 * 分类树形结构
 * @param {*} data 
 * @returns 
 */
export const getCategoryTree = data => request({
  url: '/Goods/MdseClass/getTree',
  method: 'get',
  params: { ...data }
})

/**
 * 商品分类检测
 * @param {*} data 
 * @returns 
 */
export const checkChild = data => request({
  url: '/Goods/MdseClass/isGoods',
  method: 'get',
  params: { ...data }
})

// ====================商品列表====================
/**
 * 商品列表
 * @param {*} data 
 * @returns 
 */
export const getProductList = data => request({
  url: '/Goods/MdseManage/getList',
  method: 'get',
  params: { ...data }
})

/**
 * 新建商品
 * @param {*} data 
 * @returns 
 */
export const addProduct = data => request({
  url: '/Goods/MdseManage/add',
  method: 'post',
  data
})

/**
 * 更新商品
 * @param {*} data 
 * @returns 
 */
export const updateProduct = data => request({
  url: '/Goods/MdseManage/update',
  method: 'post',
  data
})

/**
 * 删除商品
 * @param {*} data 
 * @returns 
 */
export const delProduct = data => request({
  url: '/Goods/MdseManage/delete',
  method: 'post',
  data
})

/**
 * 商品详情
 * @param {*} data 
 * @returns 
 */
export const getProductDetail = data => request({
  url: '/Goods/MdseManage/get',
  method: 'get',
  params: { ...data }
})

// ====================规格模板====================
/**
 * 新建规格模板
 * @param {*} data 
 * @returns 
 */
export const addSpecTemplate = data => request({
  url: '/Goods/MdseSpec/add',
  method: 'post',
  data
})

/**
 * 更新规格模板
 * @param {*} data 
 * @returns 
 */
export const updateSpecTemplate = data => request({
  url: '/Goods/MdseSpec/update',
  method: 'post',
  data
})

/**
 * 删除规格模板
 * @param {*} data 
 * @returns 
 */
export const delSpecTemplate = data => request({
  url: '/Goods/MdseSpec/delete',
  method: 'post',
  data
})

/**
 * 规格模板详情
 * @param {*} data 
 * @returns 
 */
export const getSpecTemplateDetail = data => request({
  url: '/Goods/MdseSpec/get',
  method: 'get',
  params: { ...data }
})

/**
 * 获取规格模板列表
 * @param {*} data 
 * @returns 
 */
export const getSpecTemplateList = data => request({
  url: '/Goods/MdseSpec/getList',
  method: 'get',
  params: { ...data }
})

// ====================批量改价====================
/**
 * 新建批量改价
 * @param {*} data 
 * @returns 
 */
export const addBatchModifyPrice = data => request({
  url: '/Goods/MdseBatch/toPrice',
  method: 'post',
  data
})

// ====================批量替换====================
/**
 * 新建批量替换
 * @param {*} data 
 * @returns 
 */
export const addBatchReplace = data => request({
  url: '/Goods/MdseBatch/toKeyword',
  method: 'post',
  data
})

// ====================运费模板====================
/**
 * 获取运费模板列表
 * @param {*} data 
 * @returns 
 */
export const getDeliveryTemplateList = data => request({
  url: '/Setting/Express/getList',
  method: 'get',
  params: { ...data }
})