// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCustomerDetail,
  getCustomerLevel,
  getCustomerTag,
  getTagDetail,
  getVcRuleDetail,
  getCustomerLevelDetail,
} from '@/services/customer';
import {
  getCurAccountInfo
} from '@/services/global.js';

/**
 * 初始化数据
 */
const initialState = {
  customerDetail: {},
  customerLevelList: {},
  customerTagList: {},
  tagDetail: {},
  vcRuleDetail: {},
  customerLevelDetail: {},
  account: {},
}

/**
 * reducers
 */
const reducers = {
  clearCustomerDetail: (state, action) => {
    state.customerDetail = action.payload
  },
  clearTagDetail: (state, action) => {
    state.tageDetail = action.payload
  },
  clearVcRuleDetail: (state, action) => {
    state.vcRuleDetail = action.payload
  },
  clearCustomerLevelDetail: (state, action) => {
    state.customerLevelDetail = action.payload
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
 * 获取账号信息
 */
const getCurAccountInfoActionAsync = createAsyncThunk(
  'customer-manage/getCurAccountInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getCurAccountInfo(data);
    return res.result;
  }
)

/**
 * 客户详情
 */
const getCustomerDetailActionAsync = createAsyncThunk(
  'customer-manage/getCustomerDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getCustomerDetail(data);
    return res.result;
  }
)

/**
 * 客户等级
 */
const getCustomerLevelActionAsync = createAsyncThunk(
  'customer-manage/getCustomerLevelActionAsync',
  async (data, thunkAPI) => {
    const res = await getCustomerLevel(data);
    return res.result;
  }
)

/**
 * 客户等级
 */
const getCustomerLevelDetailActionAsync = createAsyncThunk(
  'customer-manage/getCustomerLevelDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getCustomerLevelDetail(data);
    return res.result;
  }
)

/**
 * 客户标签列表
 */
const getCustomerTagActionAsync = createAsyncThunk(
  'customer-manage/getCustomerTagActionAsync',
  async (data, thunkAPI) => {
    const res = await getCustomerTag(data);
    return res.result;
  }
)

/**
 * 客户标签详情
 */
const getTagDetailActionAsync = createAsyncThunk(
  'customer-manage/getTagDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getTagDetail(data);
    return res.result;
  }
)

/**
 * 储值规则详情
 */
const getVcRuleDetailActionAsync = createAsyncThunk(
  'customer-manage/getVcRuleDetailActionAsync',
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
  builder.addCase(getCustomerDetailActionAsync.fulfilled, (state, action) => {
    state.customerDetail = action.payload
  })
  builder.addCase(getCustomerLevelActionAsync.fulfilled, (state, action) => {
    state.customerLevelList = action.payload
  })
  builder.addCase(getCustomerTagActionAsync.fulfilled, (state, action) => {
    state.customerTagList = action.payload
  })
  builder.addCase(getTagDetailActionAsync.fulfilled, (state, action) => {
    state.tagDetail = action.payload
  })
  builder.addCase(getVcRuleDetailActionAsync.fulfilled, (state, action) => {
    state.vcRuleDetail = action.payload
  })
  builder.addCase(getCustomerLevelDetailActionAsync.fulfilled, (state, action) => {
    state.customerLevelDetail = action.payload
  })
  builder.addCase(getCurAccountInfoActionAsync.fulfilled, (state, action) => {
    state.account = action.payload
  })
}

const customerSlice = createSlice({
  name: 'customer-manage',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...customerSlice.actions,
  getCustomerDetailActionAsync,
  getCustomerLevelActionAsync,
  getCustomerTagActionAsync,
  getTagDetailActionAsync,
  getVcRuleDetailActionAsync,
  getCustomerLevelDetailActionAsync,
  getCurAccountInfoActionAsync,
};
export default customerSlice.reducer;