import React, { useEffect, useState } from 'react';
import {
  Layout,
  Select,
  Avatar,
  Badge,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import { PlusOutlined, UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from './store/slice';
import { createShop } from '@/services/shopList';
import Header from '../../components/layout/layout-header';
import './style.less';

const { Content } = Layout;

const Shop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const {
    getAllShopActionAsync,
    searchPackageActionAsync,
    getCategoryActionAsync,
    getNodeActionAsync,
    getSHopInfoActionAsync,
  } = actions;
  let { routers } = useSelector(state => state.layout, shallowEqual) //store数据
  let {
    shopList,
    packageData,
    categoryList,
    nodeList,
    shopInfo,
  } = useSelector(state => state.shop, shallowEqual) //store数据

  const [createShopModal, setCreateShopModal] = useState(false);

  const initialData = () => {
    dispatch(getAllShopActionAsync());
    dispatch(searchPackageActionAsync());
    dispatch(getCategoryActionAsync({ pid: 0 }));
    dispatch(getNodeActionAsync());
  }

  useEffect(() => {
    const Authorization = localStorage.getItem('Dense-Diary-Authorization')
    console.log('Authorization', Authorization);
    !Authorization && history.push('/login')
    initialData()
  }, [])

  useEffect(() => {
    if (Object.keys(shopInfo).length) {
      console.log(shopInfo);
    }
  }, [shopInfo])

  /**
   * 确认添加店铺
   */
  const confirmAddShop = () => {
    form.validateFields().then(async values => {
      const res = await createShop(values);
      if (res.code === 200) {
        message.success('创建成功');
        setCreateShopModal(false);
        dispatch(getAllShopActionAsync());
      } else {
        message.error(res.msg || '创建失败');
      }
    })
  }

  /**
   * 选择店铺进入
   * @param {*} dkb_id 
   */
  const selectShopHandler = (dkb_id) => {
    localStorage.setItem('dkb-id', dkb_id);
    dispatch(getSHopInfoActionAsync())
    history.push({
      pathname: '/overview'
    })
  }

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
                  可创建20个店铺，已创建{shopList?.length || 0}个
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
              <div
                className="add-store wrap-main-item"
                onClick={() => setCreateShopModal(true)}
              >
                <PlusOutlined />
                <span className="item-text">创建店铺&nbsp;{shopList?.length || 0}/20</span>
              </div>
              {
                shopList?.map((shop) => (
                  <div
                    className="wrap-main-item"
                    key={shop.dkb_id}
                    onClick={() => selectShopHandler(shop.dkb_id)}
                  >
                    <div className="wrap-main-top">
                      {
                        shop?.shoInfo?.logo
                          ? <Avatar src={shop?.shoInfo?.logo} shape="square" size={50} />
                          : <Avatar icon={<UserOutlined />} shape="square" size={50} />
                      }

                      <div className="store-name">{shop?.shoInfo?.name}</div>
                      <Dropdown overlay={menu}>
                        <EllipsisOutlined />
                      </Dropdown>
                    </div>
                    <div className="wrap-main-bottom">
                      <Badge status="success" text={`${shop?.shoInfo.node} / ${shop?.shoInfo?.version}`} />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="content-wrap-footer">
              Copyright © 2015-2021 成都档口宝科技有限公司 All Rights Reserved. 蜀ICP备2020034790号-1
            </div>
          </div>
        </Content>
      </Layout>
      {/* start 创建店铺 */}
      <Modal
        className="create-shop-modal"
        title="创建店铺"
        visible={createShopModal}
        destroyOnClose
        width={840}
        okText="创建店铺"
        cancelText="取消"
        onOk={confirmAddShop}
        onCancel={() => setCreateShopModal(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 10 }}
          labelAlign="left"
          requiredMark={false}
          colon={false}
        >
          <div className="create-shop-item">
            <Form.Item
              label="您的店铺名称是"
              name="name"
              rules={[
                { required: true, message: '请填写您的店铺名称' },
              ]}
            >
              <Input type="text" placeholder="请填写您的店铺名称" className="input-height" />
            </Form.Item>
            <div className="sub-label">一个响亮的店铺名称是你生意成功的第一步</div>
          </div>
          <div className="create-shop-item">
            <Form.Item
              label="你的主营品类为"
              name="industry"
              rules={[
                { required: true, message: '请选择主营品类' },
              ]}
            >
              <Select type="text" placeholder="请选择主营品类">
                {
                  categoryList?.map((cate) => (
                    <Select.Option
                      key={cate.id}
                      value={cate.id}
                    >
                      {cate.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <div className="sub-label">选择合适的售卖品类开展你的生意</div>
          </div>
          <div className="create-shop-item">
            <Form.Item
              label="您的店铺经营地域为"
              name="node"
              rules={[
                { required: true, message: '请选择店铺节点' },
              ]}
            >
              <Select type="text" placeholder="请选择店铺节点">
                {
                  nodeList?.map((node) => (
                    <Select.Option
                      key={node.id}
                      value={node.id}
                    >
                      {node.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <div className="sub-label">选择您开展生意就近的节点以获得更快的体验</div>
          </div>
        </Form>
      </Modal>
      {/* end 创建店铺 */}
    </div>
  )
}

export default Shop;