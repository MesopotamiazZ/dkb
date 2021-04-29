import React from 'react';
import { Tabs } from 'antd';
import ExpressDelivery from './expressDelivery';
import StorePickUp from './storePickUp';
import SameCityDelivery from './sameCityDelivery';
import AddressLib from './addressLib';
import './style.less';

const { TabPane } = Tabs;

const Delivery = () => {

  const pageChange = (key) => {
    console.log(key);
  }

  return (
    <div className="delivery outer-area">
      <div className="delivery-inner bg-white">
        <Tabs defaultActiveKey="1" size="large" onChange={pageChange}>
          <TabPane tab="快递配送" key="1">
            <ExpressDelivery />
          </TabPane>
          <TabPane tab="门店自提" key="2">
            <StorePickUp />
          </TabPane>
          <TabPane tab="同城配送" key="3">
            <SameCityDelivery />
          </TabPane>
          <TabPane tab="地址库" key="4">
            <AddressLib />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Delivery;