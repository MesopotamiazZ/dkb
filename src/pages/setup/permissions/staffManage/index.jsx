import React from 'react';
import { Button, Checkbox } from 'antd';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import './style.less';

const StaffManage = () => {

  const tools = {
    btns: [
      {
        text: '新建员工',
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
    placeholder: '请输入员工信息',
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
      title: '员工账号',
      dataIndex: '',
      align: 'left',
    },
    {
      title: '员工姓名',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '联系方式',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '员工角色',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '二次验证',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '最后操作时间',
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
    <div className="staff-manage outer-area">
      <div className="staff-manage-inner bg-white">
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

export default StaffManage;