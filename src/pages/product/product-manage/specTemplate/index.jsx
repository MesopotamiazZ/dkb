import React, { memo, useState } from 'react';
import { Alert, Tag, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { delSpecTemplate } from '@/services/product';
import moment from 'moment';
import DkbTable from '@/components/dkb-table';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import DelTipModal from '@/components/delete-tip-modal';

import './style.less';

const SpecTemplate = memo(() => {
  const history = useHistory();
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const tools = {
    btns: [
      {
        text: '新建规格模板',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/product/product-manage/add-spec-template'
          })
        }
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
    placeholder: '请输入模板名称',
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
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          history.push({
            pathname: '/product/product-manage/add-spec-template',
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
        onActionClick: () => {
          setCurRecord(record);
          setTimeout(() => {
            setDelTipModal(true);
          }, 0)
        },
      },
    ]
  }

  const columns = [
    {
      title: '模板名称',
      // dataIndex: 'name',
      render: (record) => (
        <div>
          <span>{record.name}</span>
          {
            record.is_system
            && <Tag color="#007bff">系统模板</Tag>
          }
        </div>
      ),
      width: '25%',
      align: 'left',
    },
    {
      title: '规格值',
      dataIndex: 'values',
      width: '25%',
      align: 'left',
      render: (value) => (
        <span>{value.map((item) => (item.name)).join(',')}</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
      align: 'center',
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
    <div className="spec-template outer-area">
      <div className="spec-template-inner bg-white">
        <Alert
          message="帮助提示"
          description="规格模板是针对商品存在多个SKU所设计的，例如鞋类有不同的配色和尺码。"
          type="info"
          showIcon
          closable
        />
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Goods/MdseSpec/getList"
          row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
      <DelTipModal
        title="删除规格模板"
        width={282}
        text={`确认删除【${curRecord?.name}】规格模板？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await delSpecTemplate({ id: curRecord.id });
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
})

export default SpecTemplate;