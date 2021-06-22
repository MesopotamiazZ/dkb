import React, { memo } from 'react';
import { Table } from 'antd';
import DeliveryInfoWrap from './components/delivery-info-wrap';
import HeaderTitle from './components/header-title';
import OrderInfoWrap from './components/order-info-wrap';
import RenderTitle from '@/components/renderTitle';
import './style.less';
import avatarPic from '@/assets/images/avatar.jpg';

const OrderDetail = memo(() => {
  const columns = [
    {
      title: '商品',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.name}
          subTitle={`颜色：${record?.spec?.color}/尺寸：${record?.spec?.size}`}
          avatar={avatarPic}
        />
      ),
      width: '30%',
      align: 'left',
    },
    {
      title: '单价',
      dataIndex: 'price',
      render: (text) => (
        <span>￥{text}</span>
      ),
    },
    {
      title: '数量',
      dataIndex: 'number',
      render: (text) => (
        <span>{text} 件</span>
      )
    },
    {
      title: '小计(元)',
      dataIndex: 'total',
      render: (text) => (
        <span>￥{text}</span>
      )
    },
    {
      title: '售后状态',
      dataIndex: 'sales_status',
    },
    {
      title: '发货状态',
      dataIndex: 'status',
    },
  ];
  return (
    <div className="order-detail outer-area">
      <div className="order-detail-inner bg-white">
        <OrderInfoWrap />
        <DeliveryInfoWrap
          deliveryType="快递配送"
          address="张明,13222222222,四川省 成都市 青羊区 乱七八糟路156号"
        />
        <div className="order-product-info">
          <HeaderTitle title="商品信息" />
          <Table
            columns={columns}
            dataSource={[]}
            footer={() => {
              return (
                <>
                  <div className="footer-total">
                    <div className="footer-total-item">
                      <div className="item-label">商品总价：</div>
                      <div className="item-amount">￥300.00</div>
                    </div>
                    <div className="footer-total-item">
                      <div className="item-label">运费：</div>
                      <div className="item-amount">￥20.00</div>
                    </div>
                    <div className="footer-total-item">
                      <div className="item-label">优惠：</div>
                      <div className="item-amount">-20.00</div>
                    </div>
                    <div className="footer-total-item actual-price">
                      <div className="item-label">实收金额：</div>
                      <div className="item-amount">￥300.00</div>
                    </div>

                  </div>
                  <div className="clearBoth"></div>
                </>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default OrderDetail;