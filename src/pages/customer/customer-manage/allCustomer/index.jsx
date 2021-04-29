import React from 'react';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const allCustomer = () => {
  const tools = {
    btns: [
      {
        text: '新建客户',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true,
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入客户信息',
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
    ]
  }

  const columns = [
    {
      title: '客户',
      dataIndex: '',
      width: '20%',
      align: 'center',
    },
    {
      title: '等级',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '积分',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '储值余额',
      dataIndex: '',
      render: (text, record) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '下单次数',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '上次下单时间',
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
    <div className="all-customer outer-area">
      <div className="all-customer-inner bg-white">
        <DkbTable
          // tabs={tabs}
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

export default allCustomer;