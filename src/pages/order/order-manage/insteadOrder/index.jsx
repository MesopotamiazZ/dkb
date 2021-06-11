import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Divider,
  Button,
  Input,
  Form,
  Modal,
  Avatar,
  message,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { hangUpAndSubmit } from '@/services/order';
import _ from 'lodash';
import NP from 'number-precision';
import CategoryItemComp from '@/components/category-item-comp';
import SearchAndSort from '@/components/searchAndSort';
import ProductCard from '@/components/product-card';
import OrderListItem from '@/components/order-list-item';
import SelectTextSpec from '@/components/select-text-spec';
import SelectImgSpec from '@/components/select-img-spec';
import AddAnddecreaseComp from '@/components/addAnddecreaseComp';
import DeliveryInfoModal from '@/components/delivery-info-modal';
import OrderRemarkModal from '@/components/order-remark-modal';
import './style.less';
import editpen from '@/assets/images/edit_small.png';
import flagpng from '@/assets/images/flag.png';
import boxpng from '@/assets/images/box.png';

const { TextArea } = Input;

const InsteadOrder = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getCategoryListActionAsync,
    getProductListTextActionAsync,
    getProductListImgActionAsync,
    getProductSkuInfoActionAsync,
    addProductOrderList,
    calculateOrderActionAsync, // 费用计算
    saveCustomerAddress, // 保存客户地址
    clearCustomerAddress, // 清空客户地址
    clearProductOrderList,
    saveRemarkInfo,
    clearRemarkInfo,
  } = actions;

  let {
    getCategoryList,
    productList,
    productSkuInfo,
    productOrderList,
    calculateOrderInfo,
    customerAddress,
    remarkInfo,
  } = useSelector(state => state['order-manage'], shallowEqual) //store数据

  // console.log(customerAddress)
  const [cateActive, setCateActive] = useState(1);
  const [productDescModal, setProductDescModal] = useState(false);
  const [curTextSpecs, setCurTextSpecs] = useState({}); // 所有商品文字sku对象
  const [curImgSpecs, setCurImgSpecs] = useState({}); // 商品图片sku对象
  const [addProductNum, setAddProductNum] = useState(1); // 下单商品个数
  const [checked, setChecked] = useState([]); // 选中的订单
  const [isShowDeliverInfoModal, setIsShowDeliverInfoModal] = useState(false); // 配送信息modal
  const [defaultAddress, setDefaultAddress] = useState({}); // 默认
  const [isOrderRemarkModal, setIsOrderRemarkModal] = useState(false); // 订单备注modal
  const [defaultRemarkInfo, setDefaultRemarkInfo] = useState({}); // 默认

  const initialData = () => {
    dispatch(getCategoryListActionAsync({
      pid: 0,
      page: 1,
      limit: 20
    }));
    dispatch(getProductListTextActionAsync({ page: 1, limit: 16 }))
  }

  useEffect(() => {
    initialData();
    return () => {
      dispatch(clearProductOrderList());
      dispatch(clearCustomerAddress());
      dispatch(clearRemarkInfo());
    }
  }, [])

  /**
   * 
   * @returns 计算、挂起、下单
   */
  const parseCalculateOrder = (payCode = null, toOrder = true) => {
    return {
      userPhone: form.getFieldValue('userPhone'),
      goods: productOrderList.map((product) => ({
        goodsId: product.id,
        skuId: product.skuId,
        goodsNum: product.number
      })),
      ...remarkInfo,
      delivery: customerAddress.delivery,
      storesId: localStorage.getItem('dkb-id'),
      orderAlter: null,
      freight: null,
      address: {
        name: customerAddress.name,
        phone: customerAddress.phone,
        addCode: [
          customerAddress.province,
          customerAddress.city,
          customerAddress.area
        ],
        address: customerAddress.address
      },
      payCode,
      toOrder,
    }
  }

  /**
   * 后台计算价格
   */
  useEffect(() => {
    // console.log(remarkInfo, customerAddress)
    if (productOrderList.length
      && form.getFieldValue('userPhone')
      && Object.keys(remarkInfo).length
      && Object.keys(customerAddress).length) {
      dispatch(calculateOrderActionAsync(parseCalculateOrder()));
    }
  }, [remarkInfo, customerAddress, productOrderList])

  /**
   * 挂起
   */
  const hangUp = async () => {
    if (!productOrderList.length) {
      message.warning('请先下单');
      return
    }
    if (!form.getFieldValue('userPhone')) {
      message.warning('请输入客户手机号');
      return
    }
    if (!Object.keys(remarkInfo).length) {
      message.warning('请先填写备注信息');
      return
    }
    if (!Object.keys(customerAddress).length) {
      message.warning('请先填写配送信息');
      return
    }
    const res = await hangUpAndSubmit(parseCalculateOrder(7, false));
    if (res.code === 200 && res.result.orderId) {
      message.success('挂单成功');
    } else {
      message.warning('挂单失败');
    }
  }

  /**
   * 提交
   */
  const submit = async () => {
    if (!productOrderList.length) {
      message.warning('请先下单');
      return
    }
    if (!form.getFieldValue('userPhone')) {
      message.warning('请输入客户手机号');
      return
    }
    if (!Object.keys(remarkInfo).length) {
      message.warning('请先填写备注信息');
      return
    }
    if (!Object.keys(customerAddress).length) {
      message.warning('请先填写配送信息');
      return
    }
    const res = await hangUpAndSubmit(parseCalculateOrder(null, false));
    if (res.code === 200 && res.result.orderId) {
      message.success('下单成功');
    } else {
      message.warning('下单失败');
    }
  }

  const clearCurSpecs = () => {
    setCurTextSpecs({});
    setCurImgSpecs({});
  }

  /**
   * 切换商品类别
   * @param {*} id 
   */
  const handleOnChange = (id) => {
    setCateActive(id);
  }

  /**
   * 点击新增商品
   * @param {*} id 
   */
  const onAddProductCard = (id) => {
    dispatch(getProductSkuInfoActionAsync({ id }));
    setTimeout(() => {
      setProductDescModal(true);
    }, 0)
  }

  /**
   * 是否选中订单
   */
  const onCheckChange = (id) => {
    if (checked.indexOf(id) === -1) {
      setChecked(checked.concat(id));
    } else {
      let checkedClone = _.cloneDeep(checked);
      checked.forEach((che, index) => {
        if (che === id) {
          checkedClone.splice(index, 1);
        }
      })
      setChecked(checkedClone);
    }
  }

  /**
   * specs_info obj -> arr
   */
  const parseSpecs = useCallback((info) => {
    if (info) {
      let specsObj = {};
      let arr = [];
      let keysSorted = Object.keys(info).sort(function (a, b) { return -1 });
      for (let i = 0; i < keysSorted.length; i++) {
        specsObj[keysSorted[i]] = info[keysSorted[i]];
      }

      for (let key in specsObj) {
        arr.push({ key: key, value: specsObj[key] });
      }
      return arr;
    } else {
      return [];
    }
  }, [productSkuInfo])

  /**
   * 优惠金额
   * @param {*} disArr 
   * @returns 
   */
  const parseDiscount = (disArr) => {
    let discount = 0;
    disArr.forEach((dis) => {
      discount = NP.plus(discount, Number(dis.money));
    })
    return discount.toFixed(2);
  }

  /**
   * 小计金额
   */
  const parseSubTotal = () => {
    let price = 0;
    productOrderList.forEach((order) => {
      order.skuData.forEach((data) => {
        if (checked.indexOf(order.skuId) !== -1 && order.skuId === data.sku_id) {
          price = NP.plus(price, NP.times(order.number, Number(data.price)))
        }
      })
    })
    return price;
  }

  // /**
  //  * 应收金额
  //  */
  // const parseActualTotal = () => {
  //   return ''
  // }

  /**
   * 商品文字sku改变
   */
  const onChangeTextSpec = (obj) => {
    let curTextSpecsClone = JSON.parse(JSON.stringify(curTextSpecs));
    // console.log(1212, Object.assign(curTextSpecsClone, obj))
    setCurTextSpecs(Object.assign(curTextSpecsClone, obj));
  }

  /**
   * 商品图片sku改变
   * @param {*} obj 
   */
  const onChangeImgSpec = (obj1, obj2) => {
    let curTextSpecsClone = JSON.parse(JSON.stringify(curTextSpecs));
    setCurTextSpecs(Object.assign(curTextSpecsClone, obj2));
    setCurImgSpecs(obj1);
  }

  /**
   * 图片搜索筛选
   * @param {*} base64 
   */
  const handleGetBase64 = (base64) => {
    let formData = new FormData();
    formData.append('image', base64);
    formData.append('page', 1);
    formData.append('limit', 10);
    dispatch(getProductListImgActionAsync(formData));
  }

  return (
    <div className="instead-order outer-area">
      <div className="instead-order-left">
        <div className="left-header bg-white">
          <div className="left-header-cate">
            <CategoryItemComp
              title="所属分类"
              isShowOperator={true}
              onChange={handleOnChange}
              datas={getCategoryList?.list || []}
              active={cateActive}
              liWidth={58}
            />
          </div>
          <Divider dashed />
          <div className="left-header-filter">
            <SearchAndSort
              // onGetAddress={onGetAddress}
              onGetBase64={handleGetBase64}
            />
          </div>
        </div>
        <div className="left-content bg-white">
          <div className="left-content-inner">
            {
              productList?.list?.map((productInfo) => (
                <ProductCard
                  key={productInfo.id}
                  productInfo={productInfo}
                  onAddClick={onAddProductCard}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className="instead-order-right bg-white">
        <div className="order-content">
          <div className="order-content-title">
            <div className="title">
              订货单
              <span>{checked.length} 件商品</span>
            </div>
            <div className="edit">编辑</div>
          </div>
          <div className="order-content-list">
            {
              productOrderList?.length
                ? productOrderList.map((product) => (
                  <OrderListItem
                    key={productSkuInfo?.skuId}
                    productSkuInfo={product}
                    checked={checked}
                    onCheckChange={onCheckChange}
                  />
                )) : '没有选中商品'
            }

          </div>
          {/* <div className="order-content-other">
            <Button
              className="remark-btn"
              icon={<img src={flagpng} alt="" />}
            >
              备注
            </Button>
            <Button
              className="delivery-btn"
              icon={<img src={boxpng} alt="" />}
            >
              配送方式
            </Button>
          </div> */}
        </div>
        <div className="order-info">
          <Form
            form={form}
            layout="vertical"
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 24 }}
            // labelAlign="right"
            requiredMark={false}
            initialValues={{
            }}
          // colon={false}
          >
            <Form.Item
              label="客户账号"
              name="userPhone"
            >
              <Input placeholder="请输入客户手机号" className="input-height" />
            </Form.Item>
            {/* <Form.Item
              label=""
              name="address"
            >
              <TextArea placeholder="输入或粘贴收件人姓名、电话、地址" />
            </Form.Item> */}
            <Form.Item
              label=""
              name=""
            >
              <Button
                className="delivery-btn"
                icon={<img src={boxpng} alt="" />}
                onClick={() => {
                  setIsShowDeliverInfoModal(true);
                  // console.log('customerAddress', customerAddress, Object.keys(customerAddress).length)
                  if (Object.keys(customerAddress).length) {
                    setDefaultAddress({ ...customerAddress, id: Date.now() });
                  }
                }}
              >
                配送信息
              </Button>
              <Button
                className="remark-btn"
                icon={<img src={flagpng} alt="" />}
                onClick={() => {
                  setIsOrderRemarkModal(true);
                  if (Object.keys(remarkInfo).length) {
                    setDefaultRemarkInfo({ ...remarkInfo, id: Date.now() });
                  }
                }}
              >
                备注
              </Button>
            </Form.Item>
          </Form>
          <div className="order-info-data">
            <div className="order-info-data-item" style={{ marginBottom: '5px' }}>
              <span className="iem-label">配送费：</span>
              <span className="item-data">
                ￥ {
                  Object.keys(calculateOrderInfo).length
                    ? calculateOrderInfo.order_freight
                    : '-'
                }
              </span>
            </div>
            <div className="order-info-data-item" style={{ marginBottom: '5px' }}>
              <span className="iem-label">小计金额：</span>
              <span className="item-data">
                ￥ {
                  Object.keys(calculateOrderInfo).length
                    ? calculateOrderInfo.order_Total
                    : parseSubTotal()
                }
              </span>
            </div>
            <div className="order-info-data-item">
              <span className="iem-label">订单优惠：</span>
              <span className="item-data">
                ￥ {
                  Object.keys(calculateOrderInfo).length
                    ? calculateOrderInfo.discount ? parseDiscount(calculateOrderInfo.discount) : 0.00
                    : '-'
                }
              </span>
            </div>
            <div className="order-info-data-item">
              <span className="iem-label">应收金额：￥ </span>
              <span
                className="item-data"
                style={{ fontSize: "16px", fontWeight: 700, color: '#ff4949' }}
              >
                ￥ {
                  Object.keys(calculateOrderInfo).length
                    ? calculateOrderInfo.order_actual
                    : parseSubTotal()
                }
              </span>
              <img
                src={editpen}
                alt=""
                style={{ cursor: 'pointer' }}
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
        <div className="order-btns">
          <Button
            type="primary"
            onClick={hangUp}
          >
            挂单
          </Button>
          <Button
            type="primary"
            danger
            onClick={submit}
          >
            提交
          </Button>
        </div>
      </div>
      {/* 选择sku商品规格  */}
      <Modal
        className="product-desc-modal"
        title="商品规格"
        visible={productDescModal}
        width={500}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        onOk={() => {
          // console.log(curTextSpecs, curImgSpecs, addProductNum);
          let skuInfoClone = _.cloneDeep(productSkuInfo);
          let skuId = '';
          if (productSkuInfo?.specs_info) {
            productSkuInfo?.skuData.forEach((data) => {
              if (_.isEqual(data.value, curTextSpecs)) {
                skuId = data.sku_id;
              }
            })
          } else {
            skuId = productSkuInfo.skuData[0]?.sku_id;
          }
          skuInfoClone.number = addProductNum;
          skuInfoClone.skuId = skuId;
          skuInfoClone.textSpecs = curTextSpecs;
          skuInfoClone.imgSpecs = curImgSpecs;
          dispatch(addProductOrderList(skuInfoClone));
          setProductDescModal(false);
          if (checked.indexOf(skuId) !== -1) {
            return
          }
          setChecked(checked.concat(skuId));
          clearCurSpecs(); // 清空curTextSpecs和curImgSpecs
        }}
        onCancel={() => setProductDescModal(false)}
      >
        <div className="product-info">
          <div className="product-info-avatar">
            {
              productSkuInfo.images
              && <Avatar
                src={productSkuInfo?.images[productSkuInfo?.thumb]}
                shape="square"
              />
            }
          </div>
          <div className="product-info-content">
            <div className="content-title">
              {productSkuInfo?.title}
            </div>
            <div className="content-price">
              ￥ <span>
                {productSkuInfo?.price_low}
              </span>
            </div>
          </div>
        </div>
        <div className="product-desc">
          {
            parseSpecs(productSkuInfo?.specs_info).map((data, index) => {
              const { key, value } = data;
              if (value instanceof Array) {
                return (
                  <div className="product-desc-item" key={index}>
                    <div className="item-label">{key}：</div>
                    <div className="item-content">
                      <SelectTextSpec
                        specKey={key}
                        datas={Array.from(new Set(value))}
                        value={curTextSpecs[key]}
                        onChangeSpec={onChangeTextSpec}
                      />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="product-desc-item" key={index}>
                    <div className="item-label">{key}：</div>
                    <div className="item-content">
                      <SelectImgSpec
                        specKey={key}
                        specObj={value}
                        value={curImgSpecs}
                        onChangeSpec={onChangeImgSpec}
                      />
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        <div className="product-number">
          <div className="product-number-title">
            数量：
          </div>
          <AddAnddecreaseComp
            num={addProductNum}
            max={productSkuInfo?.stock}
            min={1}
            returnNumber={(num) => {
              setAddProductNum(num);
            }}
          />
        </div>
      </Modal>
      {/* 配送信息 */}
      <DeliveryInfoModal
        title="配送信息"
        width={580}
        // text: string | React.ReactDOM;
        visible={isShowDeliverInfoModal}
        defaultValues={defaultAddress}
        onOk={async (form) => {
          const values = await form.validateFields();
          // console.log(values)
          dispatch(saveCustomerAddress(values));
          setIsShowDeliverInfoModal(false);
        }}
        onCancel={() => {
          setIsShowDeliverInfoModal(false);
        }}
      />
      {/* 订单备注 */}
      <OrderRemarkModal
        title="订单备注"
        width={570}
        // text: string | React.ReactDOM;
        visible={isOrderRemarkModal}
        defaultValues={defaultRemarkInfo}
        onOk={async (form, flag) => {
          const values = await form.validateFields();
          dispatch(saveRemarkInfo({ ...values, remarkFlag: flag }));
          setIsOrderRemarkModal(false);
        }}
        onCancel={() => {
          setIsOrderRemarkModal(false)
        }}
      />
    </div >
  )
})

export default InsteadOrder;