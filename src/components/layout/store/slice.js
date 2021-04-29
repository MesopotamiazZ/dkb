// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTestDataApi } from '@/services/home'
import routers from '@/router'

import { getsectionListApi } from '@/services/global.js'

/**
 * 初始化数据
 */
const initialState = {
    token: '',
    userInfo: null,
    routers,//路由 
    sectionList: {},//板块列表
}

/**
 * reducers
 */
const reducers = {
    changeTokenAction: (state, action) => {
        state.token = action.payload
    },
    /**
     * 修改routers
     */
    changeRoutersAction: (state, action) => {
        state.routers = action.payload
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
const changeuserInfoActionAsync = createAsyncThunk(
    'layout/changeuserInfoActionAsync',
    async (data, thunkAPI) => {
        const res = await getTestDataApi(data);
        return res.data;
    }
)

/**
 * 请求板块列表
 */
const changeSectionListAsync = createAsyncThunk(
    'layout/changeSectionList',
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
    builder.addCase(changeuserInfoActionAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
    })
    builder.addCase(changeSectionListAsync.fulfilled, (state, action) => {
        state.sectionList = action.payload
    })
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers,
    extraReducers
})


export const actions = {
    ...layoutSlice.actions,
    changeuserInfoActionAsync,
    changeSectionListAsync
};
export default layoutSlice.reducer;