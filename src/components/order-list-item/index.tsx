import React, { memo } from 'react';
import {
  Avatar,
} from 'antd';
import {
  CheckCircleFilled
} from '@ant-design/icons';
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
}

interface IOrderListItem {
  productSkuInfo: productProps;
  checked: Array<number>;
  onCheckChange: (id: number) => void;
}

const OrderListItem: React.FC<IOrderListItem> = memo((props) => {
  const {
    productSkuInfo,
    checked,
    onCheckChange,
  } = props;
  return (
    <div className="order-list-item">
      <div className="item-check">
        <CheckCircleFilled
          className={[checked.indexOf(productSkuInfo?.id) !== -1 ? 'checked' : ''].join(' ')}
          onClick={() => onCheckChange(productSkuInfo?.id)}
        />
      </div>
      <div className="item-avatar">
        <Avatar src={''} shape="square" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          {productSkuInfo?.title}
        </div>
        <div className="item-content-spec">
          {/* {productSkuInfo} */}
        </div>
        <div className="item-content-price">
          {/* ￥ {productSkuInfo?.price} */}
        </div>
      </div>
      <div className="item-modify"></div>
    </div>
  )
})

export default OrderListItem;