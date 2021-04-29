import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const StaffRole = () => {

  const tools = {
    btns: [
      {
        text: '新建角色',
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
    placeholder: '请输入角色名称',
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
      title: '角色名称',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '角色描述',
      dataIndex: '',
      align: 'left',
      width: '30%'
    },
    {
      title: '员工数量',
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
    <div className="staff-role outer-area">
      <div className="staff-role-inner bg-white">
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

export default StaffRole;