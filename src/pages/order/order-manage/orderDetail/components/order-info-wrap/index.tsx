import React, { memo } from 'react';
import { Steps } from 'antd';
import HeaderTitle from '../header-title';
import OrderStatusOperactor from '../order-status-operator';
import './style.less';

const { Step } = Steps;
const content = [
  {
    key: 1,
    title: '买家下单',
    date: '2021-01-19 16:23:57',
  },
  {
    key: 2,
    title: '买家付款',
    date: '2021-01-19 16:23:57',
  },
  {
    key: 3,
    title: '买家发货',
    date: '',
  },
  {
    key: 4,
    title: '确认收货',
    date: '',
  },
]

const OrderInfoWrap = memo((props) => {
  return (
    <div className="order-info-wrap">
      <div className="order-info-wrap-inner">
        <div className="wrap-inner-info">
          <HeaderTitle title="订单信息" />
          <div className="order-data">
            <div className="order-data-item">
              <div className="item-label">订单编号：</div>
              <div className="item-text">DE5172184980099837</div>
            </div>
            <div className="order-data-item">
              <div className="item-label">订单类型：</div>
              <div className="item-text">普通订单</div>
            </div>
            <div className="order-data-item">
              <div className="item-label">订单来源：</div>
              <div className="item-text">微信.小程序</div>
            </div>
            <div className="order-data-item">
              <div className="item-label">订单时间：</div>
              <div className="item-text">2021-01-19 16:23:57</div>
            </div>
            <div className="order-data-item">
              <div className="item-label">下单客户：</div>
              <div className="item-text">123</div>
            </div>
          </div>
          <div className="pay-data">
            <div className="pay-data-item">
              <div className="item-label">支付状态：</div>
              <div className="item-text">已支付</div>
            </div>
            <div className="pay-data-item">
              <div className="item-label">支付方式：</div>
              <div className="item-text">微信支付</div>
            </div>
            <div className="pay-data-item">
              <div className="item-label">支付金额：</div>
              <div className="item-text">￥25.00</div>
            </div>
            <div className="pay-data-item">
              <div className="item-label">支付时间：</div>
              <div className="item-text">2021-01-19 16:43:20</div>
            </div>
          </div>
        </div>
        <div className="wrap-inner-step">
          <div className="step-content-wrap">
            <Steps
              size="small"
              current={1}
              labelPlacement="vertical"
            >
              {
                content.map((item) => (
                  <Step key={item.key} title={item.title} description={item.date} />
                ))
              }
            </Steps>
          </div>
          <OrderStatusOperactor />
        </div>
        <div className="wrap-inner-msg">
          <div className="msg-item">
            <div className="item-label">客户留言：</div>
            <div className="item-text">-</div>
          </div>
          <div className="msg-item">
            <div className="item-label">商家备注：</div>
            <div className="item-text">
              <a>添加备注</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default OrderInfoWrap;