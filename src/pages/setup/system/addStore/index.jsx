import React, { memo, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addStore, updateStore } from '@/services/system';
import SelfForm from '@/components/add-form';
import { baseUrl } from '@/utils/upload';
import './style.less';
import { message } from 'antd';

const AddStore = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;

  let {
    storeDetail,
    provinceList,
    cityList,
    areaList,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const {
    getStoreDetailActionAsync,
    getAreaActionAsync,
    clearCityList,
    clearAreaList,
    clearStoreDetail,
  } = actions;

  const [initValue, setInitValue] = useState({
    status: false
  })
  const [areas, setAreas] = useState([]); // 存储新增的area
  const [areas1, setAreas1] = useState([]); // 存储编辑的area
  const [storePic, setStorePic] = useState([]);
  const [loc, setLoc] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

  const initialData = () => {
    dispatch(getStoreDetailActionAsync({ id: id || localStorage.getItem('store_id') }));
  }

  useEffect(() => {
    if (id) {
      localStorage.setItem('store_id', id);
    }
    if (id || localStorage.getItem('store_id')) {
      initialData();
    }
    return () => {
      dispatch(clearStoreDetail({}));
    }
  }, [id])

  /**
   * 获取区域
   */
  useEffect(() => {
    dispatch(getAreaActionAsync({ pid: 0, level: 1 }));
  }, [])

  useEffect(() => {
    if (Object.keys(storeDetail).length) {
      setInitValue({
        name: storeDetail.name,
        su_name: storeDetail.su_name,
        su_tel: storeDetail.su_tel,
        status: storeDetail.status === 1
          || (storeDetail.status !== 2 && storeDetail.status),
      })
      setStorePic(storeDetail?.images?.map((img) => ({
        path: img,
        is_cover: 0
      })))
      setAreas1(storeDetail?.address?.area_code);
    }
  }, [storeDetail])

  /**
   * 返回坐标数据
   */
  const onSetLatLng = (loc) => {
    setLoc(loc);
  }

  /**
   * 选择行业
   * @param {*} param0 
   */
  const handleSelect = ({ value, index }) => {
    if (index === 1) {
      setAreas([value]);
      dispatch(clearCityList([]));
      dispatch(clearAreaList([]));
      dispatch(getAreaActionAsync({ pid: parseInt(value), level: 2 }));
    } else if (index === 2) {
      setAreas([...areas, value]);
      dispatch(clearAreaList([]));
      dispatch(getAreaActionAsync({ pid: parseInt(value), level: 3 }));
    } else {
      setAreas([...areas, value]);
    }
  }

  /**
   * 保存
   * @param {*} value 
   */
  const saveStoreHandle = async (value) => {
    if (id || localStorage.getItem('store_id')) {
      const res = await updateStore({
        id: id || localStorage.getItem('store_id'),
        name: value.name,
        images: value.images.map((item) => (baseUrl + item.path)),
        su_name: value.su_name,
        su_tel: value.su_tel,
        status: value.status,
        address: {
          // province: provinceList.filter((item) => item.id === value.province)[0].name,
          // city: cityList.filter((item) => item.id === value.province)[0].name,
          // district: areaList.filter((item) => item.id === value.province)[0].name,
          area_code: [value.province, value.city, value.area],
          address: value.address,
          lng: loc.lng,
          lat: loc.lat
        }
      })
      if (res.code === 200) {
        message.success('更新成功');
      } else {
        message.warning('更新失败');
      }
    } else {
      // console.log(2222, provinceList, value.province, provinceList.filter((item) => item.id === value.province))
      const res = await addStore({
        name: value.name,
        images: value.images.map((item) => (baseUrl + item.path)),
        su_name: value.su_name,
        su_tel: value.su_tel,
        status: value.status,
        address: {
          // province: provinceList.filter((item) => item.id == value.province)[0].name,
          // city: cityList.filter((item) => item.id == value.city)[0].name,
          // district: areaList.filter((item) => item.id == value.area)[0].name,
          area_code: [value.province, value.city, value.area],
          address: value.address,
          lng: loc.lng,
          lat: loc.lat
        }
      })
      if (res.code === 200) {
        message.success('新增成功');
        history.push({
          pathname: '/setup/system/delivery'
        })
      } else {
        message.warning('新增失败');
      }
    }
  }

  //   {
  //     "name": "测试门店",
  //     "images": [
  //          "https://file.dangkoubao.com/public/1.png",
  //          "https://file.dangkoubao.com/public/2.png"
  //     ],
  //     "su_name": "张店长",
  //     "su_tel": "13222222222",
  //     "address": {
  //          "province": "福建省",
  //          "city": "福州市",
  //          "district": "鼓楼区",
  //          "area_code": "350000,350100,350102",
  //          "address": "东街街道东街东街口聚春园大酒店(福州店)",
  //          "lng": "119.306353",
  //          "lat": "26.092066"
  //     },
  //     "status": true
  // }

  const formProps = {
    initValue,
    formArr: [
      {
        title: "基础信息", //每一块的标题
        search: [
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'name',
              name: 'name',
              label: '门店名称',
              type: 'input', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '商户名称最长20字',
            }
          },
          {
            wrap: {
              key: 'images',
              name: 'images',
              label: '门店图片',
              type: 'proupload', // 上传图片
              labelCol: {
                span: 2,
              },
            },
            props: {
              //请求的参数
              imageParams: {

              },
              //请求地址
              actionUrl: baseUrl,
              //图片拼接的域名
              imgUrl: baseUrl,
              // 是否是只上传一张图片 1只上传一张 多张不传这个参数
              is_only: 1,
              //图片的文件路径
              // fileUrl: `${beforeKey}merchant-logo`,
              //接受图片的类型
              accept: ".png,.jpg,.jpeg,.svg", //默认值是.jpg
              // 初始列表
              // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
              enum: storePic,
              // [
              //   {
              //     path: "图片的路径，没有拼接域名",
              //     is_cover: 0 //是否为封面图
              //   }
              // ],
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_name',
              name: 'su_name',
              label: '联系人',
              type: 'input', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '请填写商户联系人名称',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_tel',
              name: 'su_tel',
              label: '联系电话',
              type: 'input', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '请填写商户客服电话号码',
            }
          },
          {
            wrap: {
              key: 'area',
              name: 'area',
              label: '门店地址',
              type: 'proselects3',
              style: {
                marginBottom: 0
              },
              required: true,
              labelCol: {
                span: 2,
              },
            },
            props: {
              provinceList,
              cityList,
              areaList,
              handleSelect,
              selects: areas1,
            },
          },
          {
            wrap: {
              key: 'address',
              name: 'address',
              label: '地图定位',
              type: 'maplocation',
              // style: {
              //   marginBottom: 0
              // },
              labelCol: {
                span: 2,
              },
            },
            props: {
              onSetLatLng,
              editAddress,
            },
          },
        ]
      },
      {
        title: "开关设置", //每一块的标题
        search: [
          {
            wrap: {
              key: 'status',
              name: 'status',
              label: '门店状态',
              type: 'switch', // 与antd对应 
              labelCol: {
                span: 2,
              },
              valuePropName: 'checked',

              // rules: [
              //   { required: true },
              // ],
            },
            props: {
              // checkedChildren: '开',
              // unCheckedChildren: '关'
            }
          },
        ]
      },
    ],
    config: [
      {
        text: "保存",
        wrap: {
          type: "primary"
        },
        htype: "submit", // submit || reset
        onBtnClick: async (value) => {
          console.log("按钮点击的事件222", value);
          saveStoreHandle(value)
        }
      },
      {
        text: "取消",
        wrap: {
          //按钮的一些属性配置
        },
        htype: "", // submit || reset
        onBtnClick: (value) => {
          //value 返回的是表单的数据
          // type=submit 按钮有提交功能 会自动数据验证
          // type=reset  重置表单
          // 其余的不用传type值
          console.log("按钮点击的事件111", value);
          history.push({
            pathname: '/setup/system/delivery'
          })
        }
      }
    ]
  }

  return (
    <div className="add-store outer-area">
      <SelfForm
        formProps={formProps}
      />
    </div>
  )
})

export default AddStore;

