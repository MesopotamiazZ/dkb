import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import {
  addProduct,
  updateProduct,
} from '@/services/product';
import { baseUrl } from '@/utils/upload';
import SelfForm from '@/components/add-form';
import './style.less';

const properties = ['price', 'stock', 'weight', 'skuCode', 'barCode', 'reveal', 'id', 'specImgs', 'sku_id'];

const PublishProduct = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const id = location?.state?.id;

  const {
    getCategoryTreeActionAsync,
    getSpecTemplateListActionAsync,
    getDeliveryTemplateListActionAsync,
    getProductDetailActionAsync,
    clearProductDetail,
    getSpecTemplateDetailActionAsync,
    clearSpecTemplateDetail,
  } = actions;

  let {
    categoryTrees,
    specTemplateList,
    deliveryTemplateList,
    productDetail,
    specTemplateDetail,
  } = useSelector(state => state['product-manage'], shallowEqual) //store数据

  const [initValue, setInitValue] = useState({
    sort: 100,
    specsType: '1',
    status: '1',
  }); // 表单默认值
  const [productPicEnum, setProductPicEnum] = useState([]); // 商品组图
  const [specType, setSpecType] = useState(''); // 规格设置
  const [defaultSingleData, setDefaultSingleData] = useState([]); // 单规格默认数据
  const [singleData, setSingleData] = useState([]); // 单规格实时数据
  const [defaultMuchData, setDefaultMuchData] = useState([]); // 多规格默认数据
  const [selectCheck, setSelectCheck] = useState([]); // 多规格选择声明
  // const [hasSelects, setHasSelects] = useState([]); // 可选设置项
  const [specImgs, setSpecImgs] = useState({}); // 多规格图片
  const [muchData, setMuchData] = useState([]); // 多规格实时数据
  const [specsInfo, setSpecsInfo] = useState({});

  const initialData = () => {
    dispatch(getCategoryTreeActionAsync({ pid: 0 }));
    dispatch(getSpecTemplateListActionAsync({ page: 1, limit: 20 }));
    dispatch(getDeliveryTemplateListActionAsync({ page: 1, limit: 99 }));
  }

  /**
   * 初始化
   */
  useEffect(() => {
    initialData();
    return () => {
      dispatch(clearSpecTemplateDetail({}));
      localStorage.removeItem('product_id');
    }
  }, [])

  /**
   * 设置默认规格模板
   */
  useEffect(() => {
    if (specTemplateList.length) {
      dispatch(getSpecTemplateDetailActionAsync({ id: specTemplateList[0].id }));
      setInitValue({ ...initValue, specsId: specTemplateList[0].id })
    }
  }, [specTemplateList])

  /**
   * 设置默认运费模板
   */
  useEffect(() => {
    if (deliveryTemplateList.length) {
      let defaultList = deliveryTemplateList.filter((item) => {
        return item.is_default;
      })
      setInitValue({ ...initValue, expId: defaultList[0].id })
    }
  }, [deliveryTemplateList])

  useEffect(() => {
    setSpecType(initValue.specsType);
  }, [initValue])

  /**
   * 获取商品详情
   */
  useEffect(() => {
    if (id) {
      localStorage.setItem('product_id', id);
    }
    if (id || localStorage.getItem('product_id')) {
      dispatch(getProductDetailActionAsync({ id }));
    }
    return () => {
      dispatch(clearProductDetail({}));
    }
  }, [id])

  const parseDelivery = (obj) => {
    const arr = [];
    for (let key in obj) {
      if (obj[key]) {
        arr.push(key);
      }
    }
    return arr;
  }

  const unParseDelivery = (arr) => {
    let delivery = {
      express: false,
      stores: false,
      localexp: false
    };
    arr.forEach((item) => {
      for (let key in delivery) {
        if (item === key) {
          delivery[key] = true;
        }
      }
    })
    return delivery;
  }

  /**
   * 编辑赋值规格申明
   * @param {*} skuData 
   * @returns 
   */
  const parseSkuDataValue = (skuData) => {
    const obj = {};
    skuData.forEach((data) => {
      if (data.value instanceof Array) {
        data.value.forEach((item) => {
          for (let key in item) {
            if (!obj[key]) {
              obj[key] = [item[key]];
            }
            if (obj[key] && obj[key].indexOf(item[key]) === -1) {
              obj[key].push(item[key]);
            }
          }
        })
      } else {
        for (let key in data.value) {
          if (!obj[key]) {
            obj[key] = [data.value[key]];
          }
          if (obj[key] && obj[key].indexOf(data.value[key]) === -1) {
            obj[key].push(data.value[key]);
          }
        }
      }

    })
    return obj;
  }

  /**
   * 编辑赋值设置可选项select
   * @param {*} info 
   */
  const parseSpecsInfo = (info) => {
    let newInfo = {};
    let arr = [];
    let specImg = {};
    // let newSpecImg = {};
    let keysSorted = Object.keys(info).sort(function (a, b) { return -1 });
    for (let i = 0; i < keysSorted.length; i++) {
      newInfo[keysSorted[i]] = info[keysSorted[i]];
    }
    for (let key in newInfo) {
      if (newInfo[key] instanceof Array) {
        arr.push({
          id: Date.now(),
          name: key,
          reveal: 1,
          selects: Array.from(new Set(newInfo[key]))
        });
      } else {
        let temp = [];
        specImg = newInfo[key];
        for (let k in newInfo[key]) {
          temp.push(k);
        }
        arr.push({
          id: Date.now(),
          name: key,
          reveal: 2,
          selects: temp,
        });
      }
    }
    // let keysSorted1 = Object.keys(specImg).sort(function (a, b) { return -1 });
    // for (let i = 0; i < keysSorted1.length; i++) {
    //   newSpecImg[keysSorted1[i]] = info[keysSorted1[i]];
    // }
    return { arr, specImg };
  }

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(productDetail).length) {
      setInitValue({
        ...productDetail,
        // specsType: `${productDetail.specsType}`,
        delivery: parseDelivery({
          express: productDetail.express,
          stores: productDetail.stores,
          localexp: productDetail.localexp,
        }),
        catId: productDetail.cat_id,
        specsType: `${productDetail.specs_type}`,
        expId: productDetail.expid,
        status: `${productDetail.status}`,
        specsId: productDetail.specs_id,
      });
      // 更新赋值默认图片
      setProductPicEnum(productDetail?.images.map((item, index) => ({
        path: item.split('.com')[1],
        is_cover: index === Number(productDetail.thumb) ? 1 : 0,
      })));
      // 更新赋值规格
      if (productDetail.specs_type === 1) {
        setDefaultSingleData(productDetail.skuData);
      } else {
        setSelectCheck(parseSkuDataValue(productDetail.skuData));
        // setHasSelects(parseSpecsInfo(productDetail.specs_info).arr);
        setSpecImgs(parseSpecsInfo(productDetail.specs_info).specImg);
        setDefaultMuchData(productDetail.skuData);
      }
    }
  }, [productDetail])

  /**
   * 更新single sku data
   * @param {*} data 
   */
  const onSetSingleData = (data) => {
    setSingleData(data);
  }

  const onSetSpecsTableData = useCallback((data) => {
    setMuchData(data);
  }, [])

  /**
   * 返回重新组装specsInfo
   * @param {*} info 
   * @param {*} data 
   */
  const onSetSpecsInfo = useCallback((info, data) => {
    // console.log('data', data, 'info', info)
    let infoClone = JSON.parse(JSON.stringify(info));
    let dataClone = JSON.parse(JSON.stringify(data));
    let obj = {};
    for (let i = 0; i < dataClone.length; i++) {
      let { price, stock, weight, skuCode, barCode, reveal, id, specImgs, sku_id, ...restProps } = dataClone[i];
      for (let key in restProps) {
        if (obj[`${key}`] && obj[`${key}`].indexOf(restProps[`${key}`]) === -1) {
          if (restProps[key] instanceof Array) {
            obj[`${key}`] = obj[`${key}`].concat(restProps[`${key}`]);
          } else {
            obj[`${key}`].push(restProps[`${key}`]);
          }
          // console.log('checek', obj[key])
        } else {
          if (restProps[key] instanceof Array) {
            obj[`${key}`] = restProps[`${key}`];
          } else {
            obj[`${key}`] = [restProps[`${key}`]];
          }
          // console.log('checked0', obj[key])
        }
      }
    }
    const newObj = Object.assign(obj, infoClone);
    // console.log('newObj', newObj)
    setSpecsInfo(newObj);
  }, [])

  /**
   * 刷新规格值
   */
  const onSpecsRefresh = () => {
    dispatch(getSpecTemplateListActionAsync({ page: 1, limit: 20 }));
  }

  /**
   * 格式化muchData
   * @param {*} data 
   */
  const parseData = useCallback((datas) => {
    return datas.map((data, index) => {
      let arr = [];
      for (let key in datas[index]) {
        if (properties.indexOf(key) === -1) {
          if (data[`${key}`] instanceof Array) {
            arr.push({ [key]: data[key][0] });
            // obj[`${key}`] = data[`${key}`][0];
          } else {
            arr.push({ [key]: data[key] });
            // obj[`${key}`] = data[`${key}`];
          }
        }
      }
      return {
        price: Number(data.price).toFixed(2),
        stock: data.stock,
        weight: data.weight,
        skuCode: data.skuCode,
        barCode: data.barCode,
        sku_id: data.sku_id || null,
        value: arr,
      }
    })
  }, [muchData])

  const formProps = {
    initValue,
    formArr: [
      {
        title: '基本信息',
        search: [
          {
            wrap: {
              key: 'title',
              name: 'title',
              label: '商品名称',
              type: 'textarea',
              rules: [
                { required: true, message: '请填写商品名称' },
              ],
              labelCol: {
                span: 2,
              },
              className: 'input-textarea'
            },
            props: {
              placeholder: '请填写商品名称',
            }
          },
          {
            wrap: {
              key: 'images',
              name: 'images',
              label: '商品组图',
              type: 'proupload', // 上传图片
              labelCol: {
                span: 2,
              },
              // style: { marginBottom: 0 }
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
              is_only: 20,
              //图片的文件路径
              // fileUrl: `${beforeKey}merchant-logo`,
              //接受图片的类型
              accept: ".png,.jpg,.jpeg,.svg", //默认值是.jpg
              // 初始列表
              // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
              enum: productPicEnum,
              // [
              //   {
              //     path: "图片的路径，没有拼接域名",
              //     is_cover: 0 //是否为封面图
              //   }
              // ],
            }
          },
          // {
          //   wrap: {
          //     key: 'tip1',
          //     name: 'tip1',
          //     // label: ' ',
          //     type: 'formtiptext',
          //     wrapperCol: {
          //       offset: 2,
          //     },
          //     // style: { marginBottom: 0 },
          //   },
          //   props: {
          //     tip: '不超过15张，建议上传jpg格式图片，图片大小建议：640*640像素'
          //   }
          // },
          {
            wrap: {
              key: 'catId-outer',
              name: 'catId-outer',
              label: '商品分类',
              type: 'treeselect',
              labelCol: {
                span: 2,
              },
              style: { marginBottom: 0 },
            },
            props: {
              placeholder: "请选择分类",
              dropdownStyle: { maxHeight: 400, overflow: 'auto' },
              allowClear: true,
              // treeCheckable: true,
              // treeCheckStrictly: true,
              multiple: true,
              treeDefaultExpandAll: true,
              trees: categoryTrees,
              wrap: {
                key: 'catId',
                name: 'catId',
                rules: [
                  { required: true, message: '请选择商品分类' },
                ],
              },
              // onChange: (val) => {
              //   console.log(val)
              // },
              btns: [
                {
                  id: 1, text: '刷新', onClick: () => {
                    dispatch(getCategoryTreeActionAsync({ pid: 0 }));
                  }
                },
                {
                  id: 2, text: '新建分类', onClick: () => {
                    history.push({ pathname: '/product/product-manage/classification' })
                  }
                }
              ],
              style: { width: 440, marginRight: '15px' }
            }
          },
          {
            wrap: {
              key: 'sort',
              name: 'sort',
              label: '排序',
              type: 'inputnumber',
              rules: [
                { required: true, message: '请填写排序' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              placeholder: '请填写排序',
            }
          },
        ]
      },
      {
        title: '价格库存',
        search: [
          {
            wrap: {
              key: 'specsType',
              name: 'specsType',
              label: '规格设置',
              type: 'radio',
              labelCol: {
                span: 2,
              },
              // style: { marginBottom: 0 }
            },
            props: {
              enum: [{ label: '单规格', value: '1' }, { label: '多规格', value: '2' }],
              onChange: (e) => {
                setSpecType(e.target.value);
              },
            }
          },
          // {
          //   wrap: {
          //     key: 'tip2',
          //     name: 'tip2',
          //     // label: ' ',
          //     type: 'formtiptext',
          //     wrapperCol: {
          //       offset: 2,
          //     },
          //     // style: { marginBottom: 0 },
          //   },
          //   props: {
          //     tip: '如有颜色、尺码等多种规格，请选择多规格'
          //   }
          // },
          {
            wrap: {
              key: 'specsId-outer',
              name: 'specsId-outer',
              label: '规格模板',
              type: 'select',
              labelCol: {
                span: 2,
              },
              hidden: specType === '1',
              style: { marginBottom: 0 }
            },
            props: {
              placeholder: "请选择规格模板",
              enum: specTemplateList?.map((item) => ({
                ...item,
                label: item.name,
                value: item.id
              })),
              wrap: {
                key: 'specsId',
                name: 'specsId',
                rules: [
                  { required: specType !== '1', message: '请选择规格模板' },
                ],
              },
              btns: [
                {
                  id: 1, text: '刷新', onClick: () => {
                    dispatch(getSpecTemplateListActionAsync({ page: 1, limit: 20 }));
                  }
                },
                {
                  id: 2, text: '新建规格模板', onClick: () => {
                    history.push({ pathname: '/product/product-manage/add-spec-template' })
                  }
                }
              ],
              onChange: (val) => {
                // console.log(val)
                dispatch(getSpecTemplateDetailActionAsync({ id: val }));
              },
              style: { width: 440, marginRight: '15px' },
            }
          },
          {
            wrap: {
              key: 'skuData',
              name: 'skuData',
              label: '规格明细',
              type: 'skudatainfo',
              labelCol: {
                span: 2,
              },
              wrapperCol: {
                span: 18,
              }
            },
            props: {
              type: specType, // 规格性质
              detail: specTemplateDetail, // 规格详情
              selectCheck, // 选中规格值
              specImgs, // 规格图片
              // hasSelects, // 可选设置项
              defaultSingleData, // 默认编辑单规格数据
              defaultMuchData, // 默认编辑多规格数据
              onSetSingleData,
              onSetSpecsTableData,
              onSetSpecsInfo,
              onSpecsRefresh,
            }
          }
        ]
      },
      {
        title: '配送设置',
        search: [
          {
            wrap: {
              key: 'delivery',
              name: 'delivery',
              label: '配送支持',
              type: 'checkbox',
              rules: [
                { required: true, message: '请选择配送支持' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              enum: [
                { value: 'express', label: "快递配送" },
                { value: 'stores', label: "门店自提" },
                { value: 'localexp', label: "同城配送" },
              ]
            }
          },
          {
            wrap: {
              key: 'expId-outer',
              name: 'expId-outer',
              label: '运费模板',
              type: 'select',
              labelCol: {
                span: 2,
              },
              style: { marginBottom: 0 }
            },
            props: {
              placeholder: "请选择运费模板",
              enum: deliveryTemplateList.map((item) => ({
                ...item,
                label: item.name,
                value: item.id
              })),
              wrap: {
                key: 'expId',
                name: 'expId',
                rules: [
                  { required: true, message: '请选择运费模板' },
                ],
              },
              btns: [
                {
                  id: 1, text: '刷新', onClick: () => {
                    dispatch(getDeliveryTemplateListActionAsync({ page: 1, limit: 99 }));
                  }
                },
                {
                  id: 2, text: '新建运费模板', onClick: () => {
                    history.push({ pathname: '/setup/system/add-edit-express' })
                  }
                }
              ],
              style: { width: 440, marginRight: '15px' },
            }
          },
        ]
      },
      {
        title: '商品状态',
        search: [
          {
            wrap: {
              key: 'status',
              name: 'status',
              label: '商品状态',
              type: 'radio',
              rules: [
                { required: true, message: '请选择商品状态' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              enum: [
                { value: '1', label: "立即上架" },
                { value: '3', label: "放入仓库" },
              ]
            }
          },
        ]
      },
    ],
    config: [{
      text: "保存",
      wrap: {
        type: "primary"
      },
      htype: "submit", // submit || reset
      onBtnClick: async (value) => {
        console.log("按钮点击的事件222", value);
        const thumb = value.images.map((img, index) => {
          if (img.is_cover === 1) {
            return index
          } else {
            return ''
          }
        })
          .filter((item) => {
            return item !== ''
          })[0];
        if (id || localStorage.getItem('product_id')) {
          const res = await updateProduct({
            id: id || localStorage.getItem('product_id'),
            ...value,
            catId: value.catId,
            skuData: specType === '1' ? singleData : parseData(muchData),
            images: value.images.map((img) => (baseUrl + img.path)),
            thumb: thumb || 0,
            delivery: unParseDelivery(value.delivery),
            specsType: Number(specType),
            specsId: specType === '1' ? '' : value.specsId,
            specsInfo: specType === '1' ? '' : specsInfo,
          })
          if (res.code === 200) {
            message.success('修改成功');
            history.push({
              pathname: '/product/product-manage/list'
            })
          } else {
            message.warning('修改失败');
          }
        } else {
          const res = await addProduct({
            ...value,
            catId: value.catId,
            skuData: specType === '1' ? singleData : parseData(muchData),
            // skuData: specType === '1' ? singleData : muchData,
            images: value.images.map((img) => (baseUrl + img.path)),
            thumb: thumb || 0,
            delivery: unParseDelivery(value.delivery),
            specsType: Number(specType),
            specsId: specType === '1' ? '' : value.specsId,
            specsInfo: specType === '1' ? '' : specsInfo,
          })
          if (res.code === 200) {
            message.success('新增成功');
            history.push({
              pathname: '/product/product-manage/list'
            })
          } else {
            message.warning('新增失败');
          }
        }
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
        history.go(-1);
      }
    }],
  }

  return (
    <div className="publish-product">
      <div className="publish-product-inner outer-area">
        <SelfForm
          formProps={formProps}
        />
      </div>
    </div>
  )
})

export default PublishProduct;