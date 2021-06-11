import React, { memo } from 'react';
import {
  Avatar,
} from 'antd';
import {
  CheckCircleFilled
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actions } from '../../pages/order/order-manage/store/slice';
import _ from 'lodash';
import AddAnddecreaseComp from '../../components/addAnddecreaseComp';
import './style.less';

interface ISkuData {
  sku_id: number;
  price: string;
  stock: number;
  weight: number | string;
  sku_code: number | string;
  bar_code: string | number;
  value: any;
}

interface productProps {
  id: number;
  title: string;
  thumb: number | string;
  images: Array<string>;
  specs_info: any;
  price_low: string;
  price_high: string;
  sku_ids: Array<number>;
  stock: number;
  skuData: Array<ISkuData>;
  imgSpecs: any;
  textSpecs: any;
  skuId: number;
  number: number | string;
}

interface IOrderListItem {
  productSkuInfo: productProps;
  checked: Array<number>;
  onCheckChange: (id: number) => void;
}

const OrderListItem: React.FC<IOrderListItem> = memo((props) => {
  const dispatch = useDispatch();

  const {
    productSkuInfo,
    checked,
    onCheckChange,
  } = props;

  const {
    modifyProductOrderList,
  } = actions;

  const parseImg = (obj) => {
    if (Object.keys(obj).length) {
      return obj[Object.keys(obj)[0]];
    } else {
      return productSkuInfo.images[productSkuInfo.thumb];
    }
  }

  const parseSpec = (obj) => {
    // productSkuInfo?.skuData?.forEach((info) => {
    //   if (_.isEqual(info.value, obj)) {

    //   }
    // })
    let arr = [];
    for (let key in obj) {
      arr.push({ key, value: obj[key] });
    }
    return arr.map(({ key, value }) => (
      <span className="spec-item">
        {key}: {value}，
      </span>
    ))
  }

  const parsePrice = (obj) => {
    let price = '';
    productSkuInfo?.skuData?.forEach((info) => {
      if (_.isEqual(info.value, obj)) {
        price = info.price;
      }
    })
    return price || productSkuInfo?.skuData[0]?.price;
  }

  return (
    <div className="order-list-item">
      <div className="item-check">
        <CheckCircleFilled
          className={[checked.indexOf(productSkuInfo?.skuId) !== -1 ? 'checked' : ''].join(' ')}
          onClick={() => onCheckChange(productSkuInfo?.skuId)}
        />
      </div>
      <div className="item-avatar">
        <Avatar
          src={
            parseImg(productSkuInfo?.imgSpecs)
          }
          shape="square"
        />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          {productSkuInfo?.title}
        </div>
        <div className="item-content-spec">
          {
            parseSpec(productSkuInfo?.textSpecs)
          }

        </div>
        <div className="item-content-price">
          ￥ {
            parsePrice(productSkuInfo?.textSpecs)
          }
        </div>
      </div>
      <div className="item-modify">
        <AddAnddecreaseComp
          num={productSkuInfo?.number}
          max={productSkuInfo?.stock}
          min={1}
          returnNumber={(num) => {
            // setAddProductNum(num);
            dispatch(modifyProductOrderList({
              id: productSkuInfo?.id,
              skuId: productSkuInfo?.skuId,
              number: num
            }));
          }}
          isStock={false}
        />
      </div>
    </div>
  )
})

export default OrderListItem;