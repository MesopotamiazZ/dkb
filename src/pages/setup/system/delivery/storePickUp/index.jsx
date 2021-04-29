import React, { memo } from 'react';
import ToogleTipWrap from '@/components/toogle-tip-wrap';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

const StorePickUp = memo(() => {

  const tools = {
    btns: [
      {
        text: '新建门店',
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
    placeholder: '请输入门店名称',
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
      title: '门店名称',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '联系人',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '门店地址',
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
    },
  ]

  const onStorePickUp = (checked) => {
    console.log(checked)
  }
  return (
    <>
      <ToogleTipWrap
        isOpen={true}
        title="门店自提"
        content="启用上门自提后，买家可以就近选择商品自提门店，
        买家下单后，您需要确保买家指定的自提门店商品库存充足。"
        onToogle={onStorePickUp}
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

export default StorePickUp;