import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const StorageManage = () => {

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
        text: '储值调帐',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入流水号',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      onClick: () => { }
    }
  }

  const columns = [
    {
      title: '流水号',
      dataIndex: '',
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
      align: 'center',
    },
    {
      title: '变更前',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '变更后',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '性质',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '日期',
      dataIndex: '',
      align: 'center',
    },
  ]

  return (
    <div className="storage-manage outer-area">
      <div className="storage-manage-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url=""
          // row
          // renderCell={renderCell}
          columns={columns}
          rowKey="product_id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
    </div>
  )
}

export default StorageManage;