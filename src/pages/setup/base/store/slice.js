// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBaseSet,
  getIndustry,
  // updateBaseSet
} from '@/services/setup';

/**
 * 初始化数据
 */
const initialState = {
  baseInfo: {},
  industry1: [],
  industry2: [],
}

/**
 * reducers
 */
const reducers = {
  clearindustry2: (state, action) => {
    state.industry2 = action.payload
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
 * 获取基础设置
 */
const getBaseSetActionAsync = createAsyncThunk(
  'base/getBaseSetActionAsync',
  async (data, thunkAPI) => {
    const res = await getBaseSet(data);
    return res.result;
  }
)

/**
 * 获取区域
 */
const getIndustryActionAsync = createAsyncThunk(
  'base/getIndustryActionAsync',
  async (data, thunkAPI) => {
    const res = await getIndustry(data);
    return res.result;
  }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getBaseSetActionAsync.fulfilled, (state, action) => {
    state.baseInfo = action.payload
  })
  builder.addCase(getIndustryActionAsync.fulfilled, (state, action) => {
    if (action?.meta?.arg?.pid === 0) {
      state.industry1 = action.payload
    } else {
      state.industry2 = action.payload
    }
    // state.baseInfo = action.payload
  })
}

const shopSlice = createSlice({
  name: 'base',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
  getBaseSetActionAsync,
  getIndustryActionAsync,
};
export default shopSlice.reducer;