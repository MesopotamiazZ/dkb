import React, { useState } from 'react';
import { Alert } from 'antd';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderAction from '@/components/renderAction';

import avatarPic from '@/assets/images/avatar.jpg';
import './style.less';

const BatchShip = () => {
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');

  const tools = {
    btns: [
      {
        text: '立即导入',
        antdProps: {
          type: 'primary',
        },
        onClick: () => { }
      },
      {
        text: '下载待发货订单',
        antdProps: {
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
    placeholder: '请输入流水号',
    searchBtnText: '搜索',
    // filterBtn: {
    //   text: '筛选',
    //   antdProps: {
    //   },
    //   onClick: () => { }
    // }
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
      render: (record) => (
        <RenderTitle
          mainTitle={record?.product_name}
          subTitle={`颜色：${record?.spec?.color}/尺寸：${record?.spec?.size}`}
          avatar={avatarPic}
        />
      ),
      align: 'center',
    },
    {
      title: '文件名称',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '导入订单数',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '成功数',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '导入时间',
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
    <div className="batch-ship outer-area">
      <div className="batch-ship-inner bg-white">
        <Alert
          message="帮助提示"
          description="批量发货需先下载待发货订单，或按照待发货订单表格格式正确填写订单号、
          物流公司（如留空系统则自动识别）、物流单号后方可立即导入完成批量发货。"
          type="info"
          showIcon
          closable
        />
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? ''
              : '/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          // row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
    </div>
  )
}

export default BatchShip;