// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getVcRuleDetail,
} from '@/services/customer';
import {
  getStaffList,
} from '@/services/permissions';
import {
  getCurAccountInfo
} from '@/services/global.js';

/**
 * 初始化数据
 */
const initialState = {
  vcRuleDetail: {},
  account: {},
  staffList: [],
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
 * 获取账号信息
 */
const getCurAccountInfoActionAsync = createAsyncThunk(
  'customer-storage/getCurAccountInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getCurAccountInfo(data);
    return res.result;
  }
)


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
 * 员工列表
 */
const getStaffListActionAsync = createAsyncThunk(
  'customer-storage/getStaffListActionAsync',
  async (data, thunkAPI) => {
    const res = await getStaffList(data);
    return res.result.list;
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
  builder.addCase(getCurAccountInfoActionAsync.fulfilled, (state, action) => {
    state.account = action.payload
  })
  builder.addCase(getStaffListActionAsync.fulfilled, (state, action) => {
    state.staffList = action.payload
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
  getCurAccountInfoActionAsync,
  getStaffListActionAsync,
};
export default customerSlice.reducer;