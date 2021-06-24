// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoryList,
  getProductSkuInfo,
  calculateOrder,
  getArea,
  // getProductListImg,
  getProductListByKeywords,
  getProductList,
} from '@/services/order';
import {
  getCurAccountInfo
} from '@/services/global.js';

/**
 * 初始化数据
 */
const initialState = {
  getCategoryList: {},
  productList: {},
  // searchImgObj: {},
  productSkuInfo: {}, // 当前添加商品的sku信息/single信息
  productOrderList: [], // 订货单
  calculateOrderInfo: {}, // 费用计算信息
  provinceList: [],
  cityList: [],
  areaList: [],
  customerAddress: {},
  remarkInfo: {},
  account: {}
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
 * 获取账号信息
 */
const getCurAccountInfoActionAsync = createAsyncThunk(
  'order-manage/getCurAccountInfoActionAsync',
  async (data, thunkAPI) => {
    const res = await getCurAccountInfo(data);
    return res.result;
  }
)

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
const getProductListActionAsync = createAsyncThunk(
  'order-manage/getProductListActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductList(data);
    return res.result;
  }
)

/**
 * 商品列表搜索
 */
const getProductListByKeywordsActionAsync = createAsyncThunk(
  'order-manage/getProductListByKeywordsActionAsync',
  async (data, thunkAPI) => {
    const res = await getProductListByKeywords(data);
    return res.result;
  }
)

// /**
//  * 商品列表 (图片搜索)
//  */
// const getProductListImgActionAsync = createAsyncThunk(
//   'order-manage/getProductListImgActionAsync',
//   async (data, thunkAPI) => {
//     const res = await getProductListImg(data);
//     return res.result;
//   }
// )

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
 * 计算
 */
const calculateOrderActionAsync = createAsyncThunk(
  'order-manage/calculateOrderActionAsync',
  async (data, thunkAPI) => {
    const res = await calculateOrder(data);
    return res.result;
  }
)

/**
 * 计算
 */
// const hangUpAndSubmitActionAsync = createAsyncThunk(
//   'order-manage/hangUpAndSubmitActionAsync',
//   async (data, thunkAPI) => {
//     const res = await hangUpAndSubmit(data);
//     return res.result;
//   }
// )

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
  builder.addCase(getProductListActionAsync.fulfilled, (state, action) => {
    state.productList = action.payload
  })
  builder.addCase(getProductListByKeywordsActionAsync.fulfilled, (state, action) => {
    state.productList = action.payload
  })
  // builder.addCase(getProductListImgActionAsync.fulfilled, (state, action) => {
  //   state.searchImgObj = action.payload
  // })
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
  builder.addCase(getCurAccountInfoActionAsync.fulfilled, (state, action) => {
    state.account = action.payload
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
  getProductListActionAsync,
  getProductListByKeywordsActionAsync,
  // getProductListImgActionAsync,
  getProductSkuInfoActionAsync,
  calculateOrderActionAsync,
  getAreaActionAsync,
  getCurAccountInfoActionAsync,
  // hangUpAndSubmitActionAsync,
};
export default orderSlice.reducer;