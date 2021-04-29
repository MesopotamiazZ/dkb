import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const ProductManageList = () => {

  const tabs = {
    defaultKey: 1,
    name: 'status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部商品",
        key: 1,
      },
      {
        label: "出售中",
        key: 2,
      },
      {
        label: "已售罄",
        key: 3,
      },
      {
        label: "已下架",
        key: 4,
      },
      {
        label: "库存预警",
        key: 5,
      },
      {
        label: "回收站",
        key: 6,
      },
    ]
  }

  const tools = {
    btns: [
      {
        text: '发布商品',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
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
      onClick: () => { }
    }
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '2',
        text: '删除',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '3',
        text: '推广',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '缩略图',
      render: (record) => (''),
      align: 'center',
    },
    {
      title: '商品名称/编号/分类',
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
      title: '价格(元)',
      dataIndex: '',
      render: (text, record) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '库存',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '销量',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '创建时间',
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
          type="row"
          getBtns={() => getBtns(record)}
        />
      ),
      align: 'center',
      fixed: 'right'
    }
  ]

  return (
    <div className="product-manage-list outer-area">
      <div className="product-manage-list-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url=""
          row
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

export default ProductManageList;