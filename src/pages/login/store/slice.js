// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
    getsectionListApi,
    getCurAccountInfo
} from '@/services/global.js'

/**
 * 初始化数据
 */
const initialState = {
    token: '',
    userInfo: null,
    sectionList: {},//板块列表
    accountInfo: {}, // 账号信息
}

/**
 * reducers
 */
const reducers = {
    changeTokenAction: (state, action) => {
        state.token = action.payload
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
    'login/getCurAccountInfoActionAsync',
    async (data, thunkAPI) => {
        const res = await getCurAccountInfo(data);
        return res.data;
    }
)

/**
 * 请求板块列表
 */
const changeSectionListAsync = createAsyncThunk(
    'login/changeSectionList',
    async (data, thunkAPI) => {
        const res = await getsectionListApi(data);
        return { defaultKey: 1, data: res.data };
    }
)

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
    builder.addCase(changeSectionListAsync.fulfilled, (state, action) => {
        state.sectionList = action.payload
    })
    builder.addCase(getCurAccountInfoActionAsync.fulfilled, (state, action) => {
        state.accountInfo = action.payload
    })
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers,
    extraReducers
})


export const actions = {
    ...loginSlice.actions,
    // changeuserInfoActionAsync,
    changeSectionListAsync,
    getCurAccountInfoActionAsync
};
export default loginSlice.reducer;