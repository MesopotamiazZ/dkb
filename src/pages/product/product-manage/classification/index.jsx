import React from 'react';
import { Button, Checkbox } from 'antd';
// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import NP from 'number-precision';
import moment from 'moment';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const Classification = () => {
  const tools = {
    btns: [
      {
        text: '新建分类',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入分类名称',
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
      }
    ]
  }

  const columns = [
    {
      title: '分类名称',
      // dataIndex: 'name',
      render: (record) => (
        <div>
          {record.name}
          <span className="sub-color">({record.childCount})</span>
        </div>
      ),
      width: '50%',
      align: 'left',
    },
    {
      title: '商品数',
      dataIndex: 'goodsCount',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          type="circle"
          badge_status={(record.status === 1 || record.status) ? 'success' : 'default'}
          badge_text={(record.status === 1 || record.status) ? '开启' : '关闭'}
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
    <div className="product-classification outer-area">
      <div className="product-classification-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Goods/MdseClass/getList"
          row
          requestData={{ pid: 0 }}
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
    </div>
  )
}

export default Classification;