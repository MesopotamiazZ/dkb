import React from 'react';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const StorageRule = () => {
  const tools = {
    btns: [
      {
        text: '新建规则',
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
    placeholder: '请输入规则名称',
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
      title: '规则名称',
      dataIndex: '',
      width: '30%',
      align: 'left',
    },
    {
      title: '储值面额',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return (
            <span>￥ {text}</span>
          )
        }
      },
      align: 'center',
    },
    {
      title: '赠送金额',
      dataIndex: '',
      render: (text) => {
        if (text) {
          return (
            <span>￥ {text}</span>
          )
        }
      },
      align: 'center',
    },
    {
      title: '储值礼包',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '规则状态',
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
    <div className="storage-rule outer-area">
      <div className="storage-rule-inner bg-white">
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

export default StorageRule;