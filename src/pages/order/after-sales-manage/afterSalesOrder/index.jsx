/**
 * @author tigris
 * @description 订单售后列表页面
 */
import React, { useState } from 'react';
import { Button, Checkbox, Form, Select } from 'antd';
import NP from 'number-precision';
import moment from 'moment';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const AfterSalesOrder = () => {

  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');

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
  });

  const tabs = {
    defaultKey: 0,
    name: 'service_type',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部售后",
        key: 0,
      },
      {
        label: "仅退款(未发货)",
        key: 1,
      },
      {
        label: "仅退款(已发货)",
        key: 2,
      },
      {
        label: "退货(已发货)",
        key: 3,
      },
      {
        label: "换货",
        key: 4,
      },
      {
        label: "已完成",
        key: 5,
      },
    ]
  }

  const tools = {
    btns: [
      // {
      //   text: '代客下单',
      //   antdProps: {
      //     type: 'primary',
      //   },
      //   onClick: () => { }
      // },
      {
        text: '批量操作',
        antdProps: {
          type: 'primary',
          // danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
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
                  label: '售后搜索',
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
                  label: '申请时间',
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
                col: 12,
                wrap: {
                  key: 'sales_type',
                  name: 'sales_type',
                  label: '售后类型',
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
        text: '处理售后',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '3',
        text: '关闭售后',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '订单信息',
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
      title: '客户',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.shop_mobile}
          subTitle={record?.shop_name}
        />
      ),
      align: 'left',
    },
    {
      title: '退款金额',
      dataIndex: 'redund_price',
      render: (text, record) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'left',
    },
    {
      title: '申请时间',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '类型/原因',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          status_msg={record.status_msg}
          status={record.status}
        />
      ),
      align: 'left',
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
    }
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
    <div className="after-sales-order outer-area">
      <div className="after-sales-order-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? ''
              : '/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          row
          renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
    </div>
  )
}

export default AfterSalesOrder;