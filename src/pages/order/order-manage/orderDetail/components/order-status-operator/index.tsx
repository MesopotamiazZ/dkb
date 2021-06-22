import React, { memo } from 'react';
import { Button } from 'antd';
import './style.less';

const OrderStatusOperactor = memo((props) => {
  return (
    <div className="order-status-operactor">
      <div className="show-status">
        当前订单状态：买家已付款，请商家尽快发货
      </div>
      <div className="show-tips">
        如果买家未对该笔订单进行支付操作，系统将于
        <span> 2021-01-19 16:23:57</span> 自动关闭该订单
      </div>
      <div className="show-btns">
        <Button type="primary">订单发货</Button>
        <Button>主动退款</Button>
      </div>
    </div>
  )
})

export default OrderStatusOperactor;