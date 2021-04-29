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
        text: '新建运费模板',
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
    placeholder: '请输入运费模板名称',
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
      title: '模板名称',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '计费方式',
      dataIndex: '',
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
      title: '首(重/件)价格',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '续(重/件)价格',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
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
    },
  ]

  const onExpressDilivery = (checked) => {
    console.log(checked)
  }
  return (
    <>
      <ToogleTipWrap
        isOpen={true}
        title="快递配送"
        content="启用快递配送后，买家下单可以选择快递发货，由您安排快递送货上门。"
        onToogle={onExpressDilivery}
      />
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