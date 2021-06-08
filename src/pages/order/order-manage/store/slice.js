// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryList,
  getProductListText,
  getProductSkuInfo,
  calculateOrder,
  getArea,
  toOcr,
} from '@/services/order';

/**
 * 初始化数据
 */
const initialState = {
  getCategoryList: {},
  productList: {},
  productSkuInfo: {}, // 当前添加商品的sku信息/single信息
  productOrderList: [], // 订货单
  calculateOrderInfo: {}, // 费用计算信息
  provinceList: [],
  cityList: [],
  areaList: [],
  customerAddress: {},
  remarkInfo: {}
}

/**
 * reducers
 */
const reducers = {
  // 新增商品订单列表
  addProductOrderList: (state, action) => {
    if (!state.productOrderList.length) {
      state.productOrderList.push(action.payload);
    } else {
      state.productOrderList.forEach((list, index) => {
        if (list.id === action.payload.id
          && list.skuId === action.payload.skuId) {
          state.productOrderList[index].number += action.payload.number;
        } else {
          state.productOrderList.push(action.payload);
        }
      })
    }
  },
  // 修改商品订单数量
  modifyProductOrderList: (state, action) => {
    const { id, skuId, number } = action.payload;
    state.productOrderList.forEach((list, index) => {
      if (list.id === id && list.skuId === skuId) {
        state.productOrderList[index].number = number;
      }
    })
  },
  clearProductOrderList: (state, action) => {
    state.productOrderList = [];
  },
  clearCityList: (state, action) => {
    state.cityList = action.payload
  },
  clearAreaList: (state, action) => {
    state.areaList = action.payload
  },
  // 保存客户地址
  saveCustomerAddress: (state, action) => {
    state.customerAddress = action.payload;
  },
  // 清空客户地址
  clearCustomerAddress: (state, action) => {
    state.customerAddress = {};
  },
  saveRemarkInfo: (state, action) => {
    state.remarkInfo = action.payload;
  },
  clearRemarkInfo: (state, action) => {
    state.remarkInfo = {}
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
 * 分类列表
 */
const getCategoryListActionAsync = createAsyncThunk(
  'order-manage/getCategoryListActionAsync',
  async (data, thunkAPI) => {
    const res = await getCategoryList(data);
    return res.result;
  }
)

/**
 * 商品列表
 */
const getProductListTextActionAsync = createAsyncThunk(
  'order-manage/getProductListTextActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductListText(data);
    return res.result;
  }
)

/**
 * 商品sku列表
 */
const getProductSkuInfoActionAsync = createAsyncThunk(
  'order-manage/getProductSkuInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductSkuInfo(data);
    return res.result;
  }
)

/**
 * 商品sku列表
 */
const calculateOrderActionAsync = createAsyncThunk(
  'order-manage/calculateOrderActionAsync',
  async (data, thunkAPI) => {
    const res = await calculateOrder(data);
    return res.result;
  }
)

/**
 * 获取区域
 */
const getAreaActionAsync = createAsyncThunk(
  'system/getAreaActionAsync',
  async (data, thunkAPI) => {
    const res = await getArea(data);
    return res.result;
  }
)


/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getCategoryListActionAsync.fulfilled, (state, action) => {
    state.getCategoryList = action.payload
  })
  builder.addCase(getProductListTextActionAsync.fulfilled, (state, action) => {
    state.productList = action.payload
  })
  builder.addCase(getProductSkuInfoActionAsync.fulfilled, (state, action) => {
    state.productSkuInfo = action.payload
  })
  builder.addCase(calculateOrderActionAsync.fulfilled, (state, action) => {
    state.calculateOrderInfo = action.payload
  })
  builder.addCase(getAreaActionAsync.fulfilled, (state, action) => {
    if (action?.meta?.arg?.level === 1) {
      state.provinceList = action.payload
    }
    if (action?.meta?.arg?.level === 2) {
      state.cityList = action.payload
    }
    if (action?.meta?.arg?.level === 3) {
      state.areaList = action.payload
    }
  })
}

const orderSlice = createSlice({
  name: 'order-manage',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...orderSlice.actions,
  getCategoryListActionAsync,
  getProductListTextActionAsync,
  getProductSkuInfoActionAsync,
  calculateOrderActionAsync,
  getAreaActionAsync,
};
export default orderSlice.reducer;