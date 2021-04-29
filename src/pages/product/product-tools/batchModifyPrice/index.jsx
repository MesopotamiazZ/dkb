import React from 'react';
import { Button, Checkbox, Alert } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderAction from '@/components/renderAction';

import './style.less';

const BatchModifyPrice = () => {
  const tools = {
    btns: [
      {
        text: '新建改价任务',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入流水号',
    searchBtnText: '搜索',
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '查看详情',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '流水号',
      dataIndex: '',
      width: '20%',
      align: 'left',
    },
    {
      title: '总改价商品数',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '改价金额',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '改价时间',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: '',
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

  return (
    <div className="batch-modify-price outer-area">
      <div className="batch-modify-price-inner bg-white">
        <DkbTable
          // tabs={tabs}
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

export default BatchModifyPrice;