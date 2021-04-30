import React from 'react';
import { Layout, Select, Avatar, Badge, Dropdown, Menu } from 'antd';
import { PlusOutlined, UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import Header from '../../components/layout/layout-header';
import './style.less';

const { Content } = Layout;

const Shop = () => {
  let { routers } = useSelector(state => state.layout, shallowEqual) //store数据

  const menu = (
    <Menu>
      <Menu.Item onClick={() => { }}>
        升级
      </Menu.Item>
      <Menu.Item>
        续费
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="shop-wrap">
      <Layout>
        <Header routers={routers}></Header>
        <Content
          className="shop-wrap-content"
        >
          <div className="content-wrap">
            <div className="content-wrap-header">
              <div className="title">
                <div className="main-title">
                  下午好，请选择一个店铺开始您的生意
                </div>
                <div className="sub-title">
                  可创建20个店铺，已创建1个
                </div>
              </div>
              <div className="sort">
                <Select defaultValue="lucy" style={{ width: 310 }}>
                  <Select.Option value="lucy">
                    按创建时间排序
                  </Select.Option>
                </Select>
              </div>
            </div>
            <div className="content-wrap-main">
              <div className="add-store wrap-main-item">
                <PlusOutlined />
                <span className="item-text">创建店铺&nbsp;1/20</span>
              </div>
              <div className="wrap-main-item">
                <div className="wrap-main-top">
                  <Avatar icon={<UserOutlined />} shape="square" size={50} />
                  <div className="store-name">测试商户</div>
                  <Dropdown overlay={menu}>
                    <EllipsisOutlined />
                  </Dropdown>
                </div>
                <div className="wrap-main-bottom">
                  <Badge status="success" text="中国.成都 / 体验版（剩余365天）" />
                </div>
              </div>
              <div className="wrap-main-item">
                <div className="wrap-main-top">
                  <Avatar icon={<UserOutlined />} shape="square" size={50} />
                  <div className="store-name">测试商户</div>
                  <EllipsisOutlined />
                </div>
                <div className="wrap-main-bottom">
                  <Badge status="success" text="中国.成都 / 体验版（剩余365天）" />
                </div>
              </div>
              <div className="wrap-main-item">
                <div className="wrap-main-top">
                  <Avatar icon={<UserOutlined />} shape="square" size={50} />
                  <div className="store-name">测试商户</div>
                  <EllipsisOutlined />
                </div>
                <div className="wrap-main-bottom">
                  <Badge status="success" text="中国.成都 / 体验版（剩余365天）" />
                </div>
              </div>
              <div className="wrap-main-item">
                <div className="wrap-main-top">
                  <Avatar icon={<UserOutlined />} shape="square" size={50} />
                  <div className="store-name">测试商户</div>
                  <EllipsisOutlined />
                </div>
                <div className="wrap-main-bottom">
                  <Badge status="success" text="中国.成都 / 体验版（剩余365天）" />
                </div>
              </div>
              <div className="wrap-main-item">
                <div className="wrap-main-top">
                  <Avatar icon={<UserOutlined />} shape="square" size={50} />
                  <div className="store-name">测试商户</div>
                  <EllipsisOutlined />
                </div>
                <div className="wrap-main-bottom">
                  <Badge status="success" text="中国.成都 / 体验版（剩余365天）" />
                </div>
              </div>
            </div>
            <div className="content-wrap-footer">
              Copyright © 2015-2021 成都档口宝科技有限公司 All Rights Reserved. 蜀ICP备2020034790号-1
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Shop;