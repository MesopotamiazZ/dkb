import React from 'react';
import { Button, Checkbox } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import DkbTable from '@/components/dkb-table';
import RenderAction from '@/components/renderAction';
import moment from 'moment';

import './style.less';

const StaffRole = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const tools = {
    btns: [
      {
        text: '新建角色',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          localStorage.removeItem('role_id');
          setTimeout(() => {
            history.push({
              pathname: '/setup/permissions/addRole'
            })
          }, 100)
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
    placeholder: '请输入角色名称',
    searchBtnText: '搜索',
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          history.push({
            pathname: '/setup/permissions/addRole',
            state: {
              id: record.id
            }
          })
        },
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
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      align: 'left',
      width: '30%'
    },
    {
      title: '员工数量',
      dataIndex: 'staffCount',
      align: 'center',
    },
    // {
    //   title: '状态',
    //   render: (record) => (
    //     <RenderStatus
    //       type="circle"
    //       badge_status={(record.status === 1 || record.status) ? 'success' : 'default'}
    //       badge_text={(record.status === 1 || record.status) ? '开启' : '关闭'}
    //     />
    //   ),
    //   align: 'center',
    // },
    {
      title: '更新时间',
      dataIndex: 'update_at',
      render: (text) => {
        if (text) {
          return <span>{moment(text * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
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
      fixed: 'right'
    }
  ]

  return (
    <div className="staff-role outer-area">
      <div className="staff-role-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Setting/Role/getList"
          row
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

export default StaffRole;