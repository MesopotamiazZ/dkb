/**
 * @author tigris
 * @description 客户等级列表页
 */
import React, { useState } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import DkbTable from '@/components/dkb-table';
import { delCustomerLevel } from '@/services/customer';
// import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import DelTipModal from '@/components/delete-tip-modal';

import './style.less';

const CustomerLevel = () => {
  const history = useHistory();
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');

  const tools = {
    btns: [
      {
        text: '新建等级',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/customer/customer-manage/add-level'
          })
        }
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
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '请输入客户信息',
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
        onActionClick: () => {
          history.push({
            pathname: '/customer/customer-manage/add-level',
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
        title: '客户等级',
        onActionClick: async () => {
          const res = await delCustomerLevel({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
          // setCurRecord(record);
          // setTimeout(() => {
          //   setDelTipModal(true);
          // }, 0)
        },
      },
    ]
  }

  const columns = [
    {
      title: '会员等级',
      dataIndex: 'level',
      render: (text) => (
        <span style={{ color: '#FF4949' }}>{text}</span>
      ),
      align: 'left',
    },
    {
      title: '等级名称',
      dataIndex: 'name',
      width: '30%',
      align: 'left',
    },
    {
      title: '升级条件',
      dataIndex: 'upvalue',
      render: (text) => (
        <span>{text ? text : 0}成长值</span>
      ),
      align: 'left',
    },
    {
      title: '会员人数',
      dataIndex: 'count',
      align: 'left',
    },
    {
      title: '等级状态',
      render: (record) => (
        <RenderStatus
          type="circle"
          badge_status={(record.status === 1 || record.status) ? 'success' : 'default'}
          badge_text={(record.status === 1 || record.status) ? '开启' : '关闭'}
        />
      ),
      align: 'left',
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
    <div className="customer-level outer-area">
      <div className="customer-level-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Scrm/CsrLevel/getList'
              : '/Scrm/CsrLevel/getList/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          refresh={refresh}
          row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
      <DelTipModal
        title="删除等级"
        width={282}
        text={`确认删除【${curRecord?.name}】等级？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await delCustomerLevel({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
        }}
      />
    </div>
  )
}

export default CustomerLevel;