import React, { useState } from 'react';
import { Button, Checkbox, Select, Form } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import NP from 'number-precision';
import moment from 'moment';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const OrderManageList = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
  } = actions;

  let {
  } = useSelector(state => state['order-manage'], shallowEqual) //store数据

  // 订单搜索
  const [orderObj, setOrderObj] = useState({
    default: 'order_id',
    arr: [
      {
        key: 'order_id',
        name: '订单编号',
        value: 'order_id',
        placeholder: '请输入订单编号'
      },
      {
        key: 'order_num',
        name: '订单数量',
        value: 'order_num',
        placeholder: '请输入订单数量'
      },
    ]
  });

  // 商品信息
  const [productObj, setProductObj] = useState({
    default: 'product_name',
    arr: [
      {
        key: 'product_name',
        name: '商品名称',
        value: 'product_name',
        placeholder: '请输入商品名称'
      },
      {
        key: 'product_id',
        name: '商品编号',
        value: 'product_id',
        placeholder: '请输入商品编号'
      },
    ]
  })

  // 收货信息
  const [goodsObj, setGoodsObj] = useState({
    default: 'receiver',
    arr: [
      {
        key: 'receiver',
        name: '收货人',
        value: 'receiver',
        placeholder: '请输入收货人姓名'
      },
    ]
  })

  const tabs = {
    defaultKey: 1,
    name: 'status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部订单",
        key: 1,
      },
      {
        label: "待付款",
        key: 2,
      },
      {
        label: "待发货",
        key: 3,
      },
      {
        label: "待收货",
        key: 4,
      },
      {
        label: "待评价",
        key: 5,
      },
      {
        label: "已完成",
        key: 6,
      },
      {
        label: "退款中",
        key: 7,
      },
      {
        label: "已关闭",
        key: 8,
      },
    ]
  }

  const tools = {
    btns: [
      {
        text: '代客下单',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/order/order-manage/instead-order'
          })
        }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '支持商品、收件人信息等模糊搜索',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      formProps: {
        title: '订单筛选',
        form,
        initValue: {},
        formArr: [
          {
            search: [
              {
                wrap: {
                  key: 'order',
                  name: orderObj.default,
                  label: '订单搜索',
                  type: 'input',
                },
                props: {
                  style: { width: '100%' },
                  addonBefore: (
                    <Select
                      className="select-before"
                      value={orderObj.default}
                      onChange={(value) => {
                        const objClone = JSON.parse(JSON.stringify(orderObj))
                        objClone.default = value
                        setOrderObj(objClone)
                      }}
                    >
                      {
                        orderObj?.arr.map((o) => (
                          <Select.Option key={o.key} value={o.value}>{o.name}</Select.Option>
                        ))
                      }
                    </Select>
                  ),
                  placeholder: orderObj?.arr.filter(item => (item.value === orderObj.default))[0].placeholder,
                }
              },
              {
                wrap: {
                  key: 'date',
                  name: 'date',
                  label: '下单时间',
                  type: 'rangepicker',
                },
                props: {
                  ranges: {
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近7天': [moment().subtract('days', 6), moment()],
                    '近30天': [moment().subtract('days', 29), moment()]
                  }
                }
              },
              {
                wrap: {
                  key: 'product',
                  name: productObj.default,
                  label: '商品信息',
                  type: 'input'
                },
                props: {
                  style: { width: '100%' },
                  addonBefore: (
                    <Select
                      className="select-before"
                      value={productObj.default}
                      onChange={(value) => {
                        const objClone = JSON.parse(JSON.stringify(productObj))
                        objClone.default = value
                        setProductObj(objClone)
                      }}
                    >
                      {
                        productObj?.arr.map((o) => (
                          <Select.Option key={o.key} value={o.value}>{o.name}</Select.Option>
                        ))
                      }
                    </Select>
                  ),
                  placeholder: productObj?.arr.filter(item => (item.value === productObj.default))[0].placeholder,
                },
              },
              {
                wrap: {
                  key: 'goods',
                  name: goodsObj.default,
                  label: '收货信息',
                  type: 'input'
                },
                props: {
                  style: { width: '100%' },
                  addonBefore: (
                    <Select
                      className="select-before"
                      value={goodsObj.default}
                      onChange={(value) => {
                        const objClone = JSON.parse(JSON.stringify(goodsObj))
                        objClone.default = value
                        setGoodsObj(objClone)
                      }}
                    >
                      {
                        goodsObj?.arr.map((o) => (
                          <Select.Option key={o.key} value={o.value}>{o.name}</Select.Option>
                        ))
                      }
                    </Select>
                  ),
                  placeholder: goodsObj?.arr.filter(item => (item.value === goodsObj.default))[0].placeholder,
                },
              },
              {
                col: 12,
                wrap: {
                  key: 'order_type',
                  name: 'order_type',
                  label: '订单类型',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'order_status',
                  name: 'order_status',
                  label: '订单状态',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'sales_status',
                  name: 'sales_status',
                  label: '售后状态',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'delivery_style',
                  name: 'delivery_style',
                  label: '配送方式',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'order_source',
                  name: 'order_source',
                  label: '订单来源',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'staff_link',
                  name: 'staff_link',
                  label: '关联员工',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
            ]
          }
        ],
        config: [{
          text: "确认",
          wrap: {
            type: "primary"
          },
          htype: "submit", // submit || reset
          onBtnClick: (value) => {
            console.log("按钮点击的事件222", value);
          }
        },
        {
          text: "取消",
          wrap: {
            //按钮的一些属性配置
          },
          htype: "", // submit || reset
          onBtnClick: (value) => {
            //value 返回的是表单的数据
            // type=submit 按钮有提交功能 会自动数据验证
            // type=reset  重置表单
            // 其余的不用传type值
            console.log("按钮点击的事件111", value);
          }
        }],
      }
    }
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '查看订单',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '2',
        text: '打印订单',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '3',
        text: '删除订单',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '商品',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.product_name}
          subTitle={`颜色：${record?.spec?.color}/尺寸：${record?.spec?.size}`}
          avatar={avatarPic}
        />
      ),
      width: '30%',
      align: 'left',
    },
    {
      title: '单价/数量',
      render: (record) => (
        <span>￥{record?.product_price} x {record?.product_number}</span>
      ),
      align: 'center',
    },
    {
      title: '买家',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.shop_mobile}
          subTitle={record?.shop_name}
        />
      ),
      align: 'center',
    },
    {
      title: '收件人',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.revice_name}
          subTitle={record?.revice_mobile}
        />
      ),
      align: 'center',
    },
    {
      title: '实收款',
      render: (record) => (
        <span>￥{NP.times(record?.product_price, record?.product_number) || 0.00}</span>
      ),
      align: 'center',
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          status_msg={record.status_msg}
          status={record.status}
        />
      ),
      align: 'center',
    },
    {
      title: '操作',
      render: (record) => (
        <RenderAction
          record={record}
          getBtns={() => getBtns(record)}
        />
      ),
      align: 'center',
      fixed: 'right'
    },
  ]

  /**
   * 重写cell
   */
  const renderCell = (_, record) => (
    <div className="cell-wrap">
      <div className="cell-wrap-line">
        <Checkbox />
        <div className="order-no">
          <span>订单编号：</span>
          <span>{record.product_id}</span>
        </div>
        <div className="order-date">
          <span>下单时间：</span>
          <span>{record.create_at}</span>
        </div>
        <div className="order-source"></div>
      </div>
    </div>
  )

  return (
    <div className="order-manage-list outer-area">
      <div className="order-manage-list-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url=""
          row
          renderCell={renderCell}
          columns={columns}
          rowKey="product_id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
    </div>
  )
}

export default OrderManageList;