import React, { memo } from 'react';
import ToogleTipWrap from '@/components/toogle-tip-wrap';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

const ExpressDelivery = memo(() => {

  const tools = {
    btns: [
      {
        text: '新建地址',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
      {
        text: '批量操作',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入地址信息',
    searchBtnText: '搜索',
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
      title: '联系人',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '联系电话',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '所在地',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '详细地址',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: '',
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
    },
  ]

  return (
    <>
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
    </>
  )
})

export default ExpressDelivery;