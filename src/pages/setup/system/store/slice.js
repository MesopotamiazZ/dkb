// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getExpressDetail,
  getStoreDetail,
  getAddressDetail,
} from '@/services/system';

/**
 * 初始化数据
 */
const initialState = {
  expressDetail: {},
  storeDetail: {},
  addressDetail: {},
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
 * 快速配送模板详情
 */
const getExpressDetailActionAsync = createAsyncThunk(
  'system/getExpressDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getExpressDetail(data);
    return res.result;
  }
)

/**
 * 门店详情
 */
const getStoreDetailActionAsync = createAsyncThunk(
  'system/getStoreDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getStoreDetail(data);
    return res.result;
  }
)


/**
 * 地址库详情
 */
const getAddressDetailActionAsync = createAsyncThunk(
  'system/getAddressDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getAddressDetail(data);
    return res.result;
  }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getExpressDetailActionAsync.fulfilled, (state, action) => {
    state.expressDetail = action.payload
  })
  builder.addCase(getStoreDetailActionAsync.fulfilled, (state, action) => {
    state.storeDetail = action.payload
  })
  builder.addCase(getAddressDetailActionAsync.fulfilled, (state, action) => {
    state.addressDetail = action.payload
  })

}

const shopSlice = createSlice({
  name: 'system',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
  getExpressDetailActionAsync,
  getStoreDetailActionAsync,
  getAddressDetailActionAsync,
};
export default shopSlice.reducer;