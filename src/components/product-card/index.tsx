import React, { memo } from 'react';
import {
  Avatar,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.less';

interface IProductInfo {
  id: number;
  images: Array<string>;
  thumb: number | string;
  title: string;
  price_low: string;
  price_high: string;
  stock: number;
}

interface IProductCard {
  productInfo: IProductInfo;
  onAddClick: (id: number) => void;
}

const ProductCard: React.FC<IProductCard> = memo((props) => {
  const {
    productInfo,
    onAddClick,
  } = props;

  return (
    <div className="product-card">
      <div className="card-avatar">
        {/* productInfo?.images[productInfo?.thumb] */}
        <Avatar
          className=""
          src={productInfo?.thumb}
          shape="square"
        />
      </div>
      <div className="card-content">
        <div className="card-content-title">
          {productInfo?.title}
        </div>
        <div className="card-content-price">
          ￥ {productInfo?.price_low}
        </div>
        <div className="card-content-stock">
          库存：{productInfo?.stock || 0}件
        </div>
        <div
          className="card-content-add"
          onClick={() => {
            onAddClick(productInfo?.id)
          }}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  )
})

export default ProductCard;