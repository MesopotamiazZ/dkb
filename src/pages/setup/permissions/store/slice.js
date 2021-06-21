// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStaffDetail,
  getRoleDetail,
  getRoleList,
  getRoleAuth,
  getStaffList,
} from '@/services/permissions';

/**
 * 初始化数据
 */
const initialState = {
  staffDetail: {},
  roleDetail: {},
  roleList: {},
  roleAuthList: [], // 权限集
  staffList: [],
}

/**
 * reducers
 */
const reducers = {
  clearStaffDetail: (state, action) => {
    state.staffDetail = action.payload
  },
  clearRoleDetail: (state, action) => {
    state.roleDetail = action.payload
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
 * 员工详情
 */
const getStaffDetailActionAsync = createAsyncThunk(
  'permissions/getStaffDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getStaffDetail(data);
    return res.result;
  }
)

/**
 * 员工列表
 */
const getStaffListActionAsync = createAsyncThunk(
  'permissions/getStaffListActionAsync',
  async (data, thunkAPI) => {
    const res = await getStaffList(data);
    return res.result.list;
  }
)

/**
 * 角色列表
 */
const getRoleListActionAsync = createAsyncThunk(
  'permissions/getRoleListActionAsync',
  async (data, thunkAPI) => {
    const res = await getRoleList(data);
    return res.result;
  }
)

/**
 * 获取权限集
 */
const getRoleAuthActionAsync = createAsyncThunk(
  'permissions/getRoleAuthActionAsync',
  async (data, thunkAPI) => {
    const res = await getRoleAuth(data);
    return res.result;
  }
)

/**
 * 获取角色详情
 */
const getRoleDetailActionAsync = createAsyncThunk(
  'permissions/getRoleDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getRoleDetail(data);
    return res.result;
  }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getStaffDetailActionAsync.fulfilled, (state, action) => {
    state.staffDetail = action.payload
  })
  builder.addCase(getStaffListActionAsync.fulfilled, (state, action) => {
    state.staffList = action.payload
  })
  builder.addCase(getRoleListActionAsync.fulfilled, (state, action) => {
    state.roleList = action.payload
  })
  builder.addCase(getRoleAuthActionAsync.fulfilled, (state, action) => {
    state.roleAuthList = action.payload
  })
  builder.addCase(getRoleDetailActionAsync.fulfilled, (state, action) => {
    state.roleDetail = action.payload
  })
}

const shopSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
  getStaffDetailActionAsync,
  getRoleListActionAsync,
  getRoleAuthActionAsync,
  getRoleDetailActionAsync,
  getStaffListActionAsync,
};
export default shopSlice.reducer;