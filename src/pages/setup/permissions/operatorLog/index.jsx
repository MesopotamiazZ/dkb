import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const OperactorLog = () => {

  const tools = {
    btns: [
      {
        text: '清空记录',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入日志信息',
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
      title: '流水号',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '操作账号',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '操作节点',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '操作终端',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '操作内容',
      dataIndex: '',
      align: 'center',
    },

  ]

  return (
    <div className="operactor-log outer-area">
      <div className="operactor-log-inner bg-white">
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

export default OperactorLog;