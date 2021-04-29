import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const ComplainOrder = () => {

  const tabs = {
    defaultKey: 1,
    name: 'status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部投诉",
        key: 1,
      },
      {
        label: "待处理",
        key: 2,
      },
      {
        label: "已处理",
        key: 3,
      },
      {
        label: "已完成",
        key: 4,
      },
    ]
  }

  const tools = {
    // btns: [
    //   {
    //     text: '代客下单',
    //     antdProps: {
    //       type: 'primary',
    //     },
    //     onClick: () => { }
    //   },
    //   {
    //     text: '批量删除',
    //     antdProps: {
    //       type: 'primary',
    //       danger: true
    //     },
    //     onClick: () => { }
    //   },
    // ],
    onSearch: () => { },
    placeholder: '支持商品、收件人信息等模糊搜索',
    searchBtnText: '搜索',
    // filterBtn: {
    //   text: '筛选',
    //   antdProps: {
    //   },
    //   onClick: () => { }
    // }
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '查看订单',
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
      align: 'center',
    },
    {
      title: '投诉客户',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.shop_mobile}
          subTitle={record?.shop_name}
        />
      ),
      align: 'center',
    },
    {
      title: '投诉渠道',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '投诉金额',
      dataIndex: '',
      render: (text, record) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '投诉时间',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '原因',
      dataIndex: '',
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
    <div className="complain-order outer-area">
      <div className="complain-order-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url=""
          // row
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

export default ComplainOrder;