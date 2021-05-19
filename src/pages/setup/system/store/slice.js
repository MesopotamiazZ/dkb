// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getExpressDetail,
  getStoreDetail,
  getAddressDetail,
  getArea,
  toogleExpress,
  // updateToogleExpress,
  toogleStore,
  // updateToogleStore,
  toogleSameCity,
  // updateToogleSameCity,
} from '@/services/system';

/**
 * 初始化数据
 */
const initialState = {
  expressDetail: {},
  storeDetail: {},
  addressDetail: {},
  provinceList: [],
  cityList: [],
  areaList: [],
  toogleExpress: { is_express: false },
  toogleStore: { is_stores: false },
  toogleCity: { is_localexp: false },
}

/**
 * reducers
 */
const reducers = {
  clearCityList: (state, action) => {
    state.cityList = action.payload
  },
  clearAreaList: (state, action) => {
    state.areaList = action.payload
  },
  clearAddressDetail: (state, action) => {
    state.addressDetail = action.payload
  },
  clearExpressDetail: (state, action) => {
    state.expressDetail = action.payload
  },
  clearStoreDetail: (state, action) => {
    state.storeDetail = action.payload
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
 * 快速配送模板详情
 */
const getExpressDetailActionAsync = createAsyncThunk(
  'system/getExpressDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getExpressDetail(data);
    return res.result;
  }
)

/**
 * 门店详情
 */
const getStoreDetailActionAsync = createAsyncThunk(
  'system/getStoreDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getStoreDetail(data);
    return res.result;
  }
)


/**
 * 地址库详情
 */
const getAddressDetailActionAsync = createAsyncThunk(
  'system/getAddressDetailActionAsync',
  async (data, thunkAPI) => {
    const res = await getAddressDetail(data);
    return res.result;
  }
)

/**
 * 地址库详情
 */
const getAreaActionAsync = createAsyncThunk(
  'system/getAreaActionAsync',
  async (data, thunkAPI) => {
    const res = await getArea(data);
    return res.result;
  }
)

/**
 * 获取开关状态
 */
const toogleExpressActionAsync = createAsyncThunk(
  'system/toogleExpressActionAsync',
  async (data, thunkAPI) => {
    const res = await toogleExpress(data);
    return res.result;
  }
)

/**
 * 更新开关状态
 */
// const updateToogleExpressActionAsync = createAsyncThunk(
//   'system/updateToogleExpressActionAsync',
//   async (data, thunkAPI) => {
//     const res = await updateToogleExpress(data);
//     return res.result;
//   }
// )

/**
 * 获取开关状态
 */
const toogleStoreActionAsync = createAsyncThunk(
  'system/toogleStoreActionAsync',
  async (data, thunkAPI) => {
    const res = await toogleStore(data);
    return res.result;
  }
)

/**
 * 更新开关状态
 */
// const updateToogleStoreActionAsync = createAsyncThunk(
//   'system/updateToogleStoreActionAsync',
//   async (data, thunkAPI) => {
//     const res = await updateToogleStore(data);
//     return res.result;
//   }
// )

/**
 * 获取开关状态
 */
const toogleSameCityActionAsync = createAsyncThunk(
  'system/toogleSameCityActionAsync',
  async (data, thunkAPI) => {
    const res = await toogleSameCity(data);
    return res.result;
  }
)

/**
 * 更新开关状态
 */
// const updateToogleSameCityActionAsync = createAsyncThunk(
//   'system/updateToogleSameCityActionAsync',
//   async (data, thunkAPI) => {
//     const res = await updateToogleSameCity(data);
//     return res.result;
//   }
// )

/**
 * 其它reducers，异步及其公共recuders
 * @param {Object} builder 
 */
const extraReducers = builder => {
  builder.addCase(getExpressDetailActionAsync.fulfilled, (state, action) => {
    state.expressDetail = action.payload
  })
  builder.addCase(getStoreDetailActionAsync.fulfilled, (state, action) => {
    state.storeDetail = action.payload
  })
  builder.addCase(getAddressDetailActionAsync.fulfilled, (state, action) => {
    state.addressDetail = action.payload
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
    // state.addressDetail = action.payload
  })
  builder.addCase(toogleExpressActionAsync.fulfilled, (state, action) => {
    state.toogleExpress = action.payload
  })
  // builder.addCase(updateToogleExpressActionAsync.fulfilled, (state, action) => {
  //   state.toogleExpress = action.payload
  // })
  builder.addCase(toogleStoreActionAsync.fulfilled, (state, action) => {
    state.toogleStore = action.payload
  })
  // builder.addCase(updateToogleStoreActionAsync.fulfilled, (state, action) => {
  //   state.toogleStore = action.payload
  // })
  builder.addCase(toogleSameCityActionAsync.fulfilled, (state, action) => {
    state.toogleCity = action.payload
  })
  // builder.addCase(updateToogleSameCityActionAsync.fulfilled, (state, action) => {
  //   state.toogleCity = action.payload
  // })
}

const shopSlice = createSlice({
  name: 'system',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...shopSlice.actions,
  getExpressDetailActionAsync,
  getStoreDetailActionAsync,
  getAddressDetailActionAsync,
  getAreaActionAsync,
  toogleExpressActionAsync,
  // updateToogleExpressActionAsync,
  toogleStoreActionAsync,
  // updateToogleStoreActionAsync,
  toogleSameCityActionAsync,
  // updateToogleSameCityActionAsync,
};
export default shopSlice.reducer;