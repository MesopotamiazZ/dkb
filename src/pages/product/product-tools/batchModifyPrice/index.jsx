import React from 'react';
import { Progress } from 'antd';
import moment from 'moment';
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

  // const getBtns = (record) => {
  //   return [
  //     {
  //       key: '1',
  //       text: '查看详情',
  //       type: 'link',
  //       onActionClick: () => { },
  //     },
  //   ]
  // }

  const columns = [
    {
      title: '流水号',
      dataIndex: 'id',
      width: '20%',
      align: 'left',
    },
    {
      title: '总改价商品数',
      dataIndex: 'total',
      align: 'center',
    },
    {
      title: '改价金额',
      dataIndex: 'money',
      align: 'center',
    },
    {
      title: '改价时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
      align: 'center',
    },
    {
      title: '操作进度',
      render: (record) => (
        <Progress percent={record.progress} size="small" />
      ),
      align: 'center',
    },
    {
      title: '操作人',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.opUserInfo?.phone}
          subTitle={record?.opUserInfo?.name}
        />
      ),
      align: 'center',
    },
    // {
    //   title: '操作',
    //   render: (record) => (
    //     <RenderAction
    //       record={record}
    //       getBtns={() => getBtns(record)}
    //     />
    //   ),
    //   align: 'center',
    //   fixed: 'right'
    // }
  ]

  return (
    <div className="batch-modify-price outer-area">
      <div className="batch-modify-price-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Goods/MdseBatch/getToPriceList"
          // row
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

export default BatchModifyPrice;