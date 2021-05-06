// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始化数据
 */
const initialState = {
  // uploadToken: {},
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
 * 获取
 */
// const getUploadTokenActionAsync = createAsyncThunk(
//   'base/getUploadTokenActionAsync',
//   async (data, thunkAPI) => {
//     const res = await getUploadToken(data);
//     return res.result;
//   }
// )

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  // builder.addCase(getAllShopActionAsync.fulfilled, (state, action) => {
  //   state.shopList = action.payload
  // })
}

const shopSlice = createSlice({
  name: 'base',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
};
export default shopSlice.reducer;