// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {

} from '@/services/product';

/**
 * 初始化数据
 */
const initialState = {

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
 * 分类详情
 */
// const getCategoryDetailActionAsync = createAsyncThunk(
//   'product-tools/getCategoryDetailActionAsync',
//   async (data, thunkAPI) => {
//     const res = await getCategoryDetail(data);
//     return res.result;
//   }
// )

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  // builder.addCase(getCategoryDetailActionAsync.fulfilled, (state, action) => {
  //   state.categoryDetail = action.payload
  // })
}

const customerSlice = createSlice({
  name: 'product-tools',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...customerSlice.actions,
};
export default customerSlice.reducer;