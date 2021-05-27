// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryDetail,
  getCategoryTree,
  getProductDetail,
  getSpecTemplateDetail,
  getSpecTemplateList,
  getDeliveryTemplateList,
} from '@/services/product';

/**
 * 初始化数据
 */
const initialState = {
  childCateList: {},
  categoryDetail: {},
  categoryTrees: [],
  productDetail: {},
  specTemplateDetail: {},
  specTemplateList: [],
  deliveryTemplateList: [],
}

/**
 * reducers
 */
const reducers = {
  clearCategoryDetail: (state, action) => {
    state.categoryDetail = action.payload
  },
  clearProductDetail: (state, action) => {
    state.productDetail = action.payload
  },
  clearSpecTemplateDetail: (state, action) => {
    state.specTemplateDetail = action.payload
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
 * 分类详情
 */
const getCategoryDetailActionAsync = createAsyncThunk(
  'product-manage/getCategoryDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategoryDetail(data);
    return res.result;
  }
)

/**
 * 获取分类树形结构
 */
const getCategoryTreeActionAsync = createAsyncThunk(
  'product-manage/getCategoryTreeActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategoryTree(data);
    return res.result;
  }
)

/**
 * 商品详情
 */
const getProductDetailActionAsync = createAsyncThunk(
  'product-manage/getProductDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductDetail(data);
    return res.result;
  }
)

/**
 * 规格模板详情
 */
const getSpecTemplateDetailActionAsync = createAsyncThunk(
  'product-manage/getSpecTemplateDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getSpecTemplateDetail(data);
    return res.result;
  }
)

/**
 * 规格模板列表
 */
const getSpecTemplateListActionAsync = createAsyncThunk(
  'product-manage/getSpecTemplateListActionAsync',
  async (data, thunkAPI) => {
    const res = await getSpecTemplateList(data);
    return res.result?.list;
  }
)

/**
 * 获取运费模板列表
 */
const getDeliveryTemplateListActionAsync = createAsyncThunk(
  'product-manage/getDeliveryTemplateListActionAsync',
  async (data, thunkAPI) => {
    const res = await getDeliveryTemplateList(data);
    return res.result?.list;
  }
)


/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getCategoryDetailActionAsync.fulfilled, (state, action) => {
    state.categoryDetail = action.payload
  })
  builder.addCase(getCategoryTreeActionAsync.fulfilled, (state, action) => {
    // state.categoryDetail[action?.meta?.arg?.pid] = action.payload
    state.categoryTrees = action.payload
  })
  builder.addCase(getProductDetailActionAsync.fulfilled, (state, action) => {
    state.productDetail = action.payload
  })
  builder.addCase(getSpecTemplateDetailActionAsync.fulfilled, (state, action) => {
    state.specTemplateDetail = action.payload
  })
  builder.addCase(getSpecTemplateListActionAsync.fulfilled, (state, action) => {
    state.specTemplateList = action.payload
  })
  builder.addCase(getDeliveryTemplateListActionAsync.fulfilled, (state, action) => {
    state.deliveryTemplateList = action.payload
  })
}

const customerSlice = createSlice({
  name: 'product-manage',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...customerSlice.actions,
  getCategoryDetailActionAsync,
  getCategoryTreeActionAsync,
  getProductDetailActionAsync,
  getSpecTemplateDetailActionAsync,
  getSpecTemplateListActionAsync,
  getDeliveryTemplateListActionAsync,
};
export default customerSlice.reducer;