// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryTree,
  getProductList,
} from '@/services/product';

/**
 * 初始化数据
 */
const initialState = {
  categoryTrees: [],
  productList: {},
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
 * 获取分类树形结构
 */
const getCategoryTreeActionAsync = createAsyncThunk(
  'product-tools/getCategoryTreeActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategoryTree(data);
    return res.result;
  }
)

/**
 * 获取分类树形结构
 */
const getProductListActionAsync = createAsyncThunk(
  'product-tools/getProductListActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductList(data);
    return res.result;
  }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getCategoryTreeActionAsync.fulfilled, (state, action) => {
    state.categoryTrees = action.payload
  })
  builder.addCase(getProductListActionAsync.fulfilled, (state, action) => {
    state.productList = action.payload
  })
}

const customerSlice = createSlice({
  name: 'product-tools',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...customerSlice.actions,
  getCategoryTreeActionAsync,
  getProductListActionAsync,
};
export default customerSlice.reducer;