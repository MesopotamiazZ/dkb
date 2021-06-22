import React, { memo } from 'react';
import { Button } from 'antd';
import HeaderTitle from '../header-title';
import './style.less';

interface IDeliveryInfoWrap {
  deliveryType: string;
  address: string;
}

const DeliveryInfoWrap: React.FC<IDeliveryInfoWrap> = memo((props) => {
  const {
    deliveryType,
    address,
  } = props;

  return (
    <div className="delivery-info-wrap">
      <HeaderTitle
        title="配送信息"
      />
      <div className="delivery-type">
        <span className="title-label">配送方式：</span>
        {deliveryType}
      </div>
      <div className="delivery-address">
        <span className="title-label">配送地址：</span>
        {address}
        <Button type="link">
          [一键复制]
        </Button>
        <Button type="link">
          修改地址
        </Button>
      </div>
    </div>
  )
})

export default DeliveryInfoWrap;