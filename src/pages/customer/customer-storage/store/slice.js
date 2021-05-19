// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getVcRuleDetail,
} from '@/services/customer';

/**
 * 初始化数据
 */
const initialState = {
  vcRuleDetail: {},
}

/**
 * reducers
 */
const reducers = {
  clearVcRuleDetail: (state, action) => {
    state.vcRuleDetail = action.payload
  },
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
 * 储值规则详情
 */
const getVcRuleDetailActionAsync = createAsyncThunk(
  'customer-storage/getVcRuleDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getVcRuleDetail(data);
    return res.result;
  }
)


/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getVcRuleDetailActionAsync.fulfilled, (state, action) => {
    state.vcRuleDetail = action.payload
  })
}

const customerSlice = createSlice({
  name: 'customer-storage',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...customerSlice.actions,
  getVcRuleDetailActionAsync,
};
export default customerSlice.reducer;