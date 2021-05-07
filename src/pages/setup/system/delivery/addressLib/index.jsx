import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ToogleTipWrap from '@/components/toogle-tip-wrap';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import moment from 'moment';

const ExpressDelivery = memo(() => {
  const history = useHistory();
  const tools = {
    btns: [
      {
        text: '新建地址',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/setup/system/add-edit-address'
          })
        }
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
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      align: 'center',
    },
    {
      title: '所在地',
      render: (record) => (
        <span>
          {record?.address?.province}, {record?.address?.city}, {record?.address?.district}
        </span>
      ),
      align: 'center',
    },
    {
      title: '详细地址',
      render: (record) => (
        <span>{record?.address?.adress}</span>
      ),
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'update_at',
      render: (text) => {
        if (text) {
          return <span>{moment(text * 1000).format('YYYY-MM-DD')}</span>
        }
      },
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
        url="/Setting/AddLib/getList"
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