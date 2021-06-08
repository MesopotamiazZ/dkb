import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Divider,
  Button,
  Input,
  Form,
  Modal,
  Avatar,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import CategoryItemComp from '@/components/category-item-comp';
import SearchAndSort from '@/components/searchAndSort';
import ProductCard from '@/components/product-card';
import OrderListItem from '@/components/order-list-item';
import SelectTextSpec from '@/components/select-text-spec';
import SelectImgSpec from '@/components/select-img-spec';
import AddAnddecreaseComp from '@/components/addAnddecreaseComp';
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
    getProductSkuInfoActionAsync,
  } = actions;

  let {
    getCategoryList,
    productList,
    productSkuInfo,
  } = useSelector(state => state['order-manage'], shallowEqual) //store数据

  const [cateActive, setCateActive] = useState(1);
  const [productDescModal, setProductDescModal] = useState(false);
  const [curTextSpecs, setCurTextSpecs] = useState({}); // 所有商品文字sku对象
  const [curImgSpecs, setCurImgSpecs] = useState({}); // 商品图片sku对象
  const [addProductNUm, setAddProductNum] = useState(1); // 下单商品个数

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
  }, [])

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
    console.log(id)
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
  const onChangeImgSpec = (obj) => {
    setCurImgSpecs(obj);
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
            <SearchAndSort />
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
            <div className="title">订货单</div>
            <div className="edit">编辑</div>
          </div>
          <div className="order-content-list">
            {
              Object.keys(productSkuInfo).length
                ? <OrderListItem
                  key={productSkuInfo?.id}
                  productSkuInfo={productSkuInfo}
                  checked={[]}
                  onCheckChange={onCheckChange}
                /> : '没有选中商品'
            }

          </div>
          <div className="order-content-other">
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
          </div>
        </div>
        <div className="order-info">
          <Form
            form={form}
            // labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            // labelAlign="right"
            requiredMark={false}
            initialValues={{
              search: true,
              reveal: '1',
              sort: 100,
            }}
          // colon={false}
          >
            <Form.Item
              label=""
              name="userPhone"
            >
              <Input placeholder="请输入客户手机号" className="input-height" />
            </Form.Item>
            <Form.Item
              label=""
              name="address"
            >
              <TextArea placeholder="输入或粘贴收件人姓名、电话、地址" />
            </Form.Item>
          </Form>
          <div className="order-info-data">
            <div className="order-info-data-item" style={{ marginBottom: '5px' }}>
              <span className="iem-label">总数量：</span>
              <span className="item-data">4 件</span>
            </div>
            <div className="order-info-data-item" style={{ marginBottom: '5px' }}>
              <span className="iem-label">合计金额：</span>
              <span className="item-data">￥ 200.00</span>
            </div>
            <div className="order-info-data-item">
              <span className="iem-label">配送费：</span>
              <span className="item-data">￥ 20.00</span>
            </div>
            <div className="order-info-data-item">
              <span className="iem-label">应收金额：￥ </span>
              <span
                className="item-data"
                style={{ fontSize: "16px", fontWeight: 700, color: '#ff4949' }}
              >
                180.00
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
          >
            挂单
          </Button>
          <Button
            type="primary"
            danger
          >
            提交
          </Button>
        </div>
      </div>
      {/* 选择sku商品规格  */}
      <Modal
        className="product-desc-modal"
        title="商品规格"
        visible={productSkuInfo?.specs_info && productDescModal}
        width={500}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        onOk={() => {
          console.log(curTextSpecs, curImgSpecs, addProductNUm)
          setProductDescModal(false);
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
            num={addProductNUm}
            max={productSkuInfo?.stock}
            min={1}
            returnNumber={(num) => {
              setAddProductNum(num);
            }}
          />
        </div>
      </Modal>
    </div >
  )
})

export default InsteadOrder;