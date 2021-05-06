// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getAllShop,
  searchPackage,
  getCategory,
  getNode,
  getShopInfo,
} from '@/services/shopList.js'

/**
 * 初始化数据
 */
const initialState = {
  shopList: [],
  packageData: {},
  categoryList: [],
  nodeList: [],
  shopInfo: {},
}

/**
 * reducers
 */
const reducers = {

}

/**
 * 异步action
 * 第二个参数 payloadCreator 应返回包含一些异步逻辑结果的promise
 * thunkAPI:
 * dispatch
 * getState
 * extra
 * signal
 * rejectWithValue
 */


/**
 * 获取所有店铺
 */
const getAllShopActionAsync = createAsyncThunk(
  'shop/getAllShopActionAsync',
  async (data, thunkAPI) => {
    const res = await getAllShop(data);
    return res.result;
  }
)

/**
 * 获取套餐信息
 */
const searchPackageActionAsync = createAsyncThunk(
  'shop/searchPackageActionAsync',
  async (data, thunkAPI) => {
    const res = await searchPackage(data);
    return res.result;
  }
)

/**
 * 品类查询
 */
const getCategoryActionAsync = createAsyncThunk(
  'shop/getCategoryActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategory(data);
    return res.result;
  }
)

/**
 * 节点查询
 */
const getNodeActionAsync = createAsyncThunk(
  'shop/getNodeActionAsync',
  async (data, thunkAPI) => {
    const res = await getNode(data);
    return res.result;
  }
)

/**
 * 店铺信息
 */
const getSHopInfoActionAsync = createAsyncThunk(
  'shop/getSHopInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getShopInfo(data);
    return res.result;
  }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getAllShopActionAsync.fulfilled, (state, action) => {
    state.shopList = action.payload
  })
  builder.addCase(searchPackageActionAsync.fulfilled, (state, action) => {
    state.packageData = action.payload
  })
  builder.addCase(getCategoryActionAsync.fulfilled, (state, action) => {
    state.categoryList = action.payload
  })
  builder.addCase(getNodeActionAsync.fulfilled, (state, action) => {
    state.nodeList = action.payload
  })
  builder.addCase(getSHopInfoActionAsync.fulfilled, (state, action) => {
    state.shopInfo = action.payload
  })
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
  getAllShopActionAsync,
  searchPackageActionAsync,
  getCategoryActionAsync,
  getNodeActionAsync,
  getSHopInfoActionAsync,
};
export default shopSlice.reducer;