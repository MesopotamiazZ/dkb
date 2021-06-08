// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryList,
  getProductListText,
  getProductSkuInfo,
} from '@/services/order';

/**
 * 初始化数据
 */
const initialState = {
  getCategoryList: {},
  productList: {},
  productSkuInfo: {}, // 当前添加商品的sku信息/single信息
  productOrderList: [], // 订货单
}

/**
 * reducers
 */
const reducers = {
  addProductOrderList: (state, action) => {
    // this.productOrderList
  }
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
 * 分类列表
 */
const getCategoryListActionAsync = createAsyncThunk(
  'order-manage/getCategoryListActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategoryList(data);
    return res.result;
  }
)

/**
 * 商品列表
 */
const getProductListTextActionAsync = createAsyncThunk(
  'order-manage/getProductListTextActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductListText(data);
    return res.result;
  }
)

/**
 * 商品sku列表
 */
const getProductSkuInfoActionAsync = createAsyncThunk(
  'order-manage/getProductSkuInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductSkuInfo(data);
    return res.result;
  }
)


/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getCategoryListActionAsync.fulfilled, (state, action) => {
    state.getCategoryList = action.payload
  })
  builder.addCase(getProductListTextActionAsync.fulfilled, (state, action) => {
    state.productList = action.payload
  })
  builder.addCase(getProductSkuInfoActionAsync.fulfilled, (state, action) => {
    state.productSkuInfo = action.payload
    state.productOrderList.push()
  })
}

const orderSlice = createSlice({
  name: 'order-manage',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...orderSlice.actions,
  getCategoryListActionAsync,
  getProductListTextActionAsync,
  getProductSkuInfoActionAsync,
};
export default orderSlice.reducer;