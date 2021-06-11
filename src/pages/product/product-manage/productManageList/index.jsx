import React from 'react';
import { Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import DelTipModal from '@/components/delete-tip-modal';
import moment from 'moment';
import './style.less';
import Avatar from 'antd/lib/avatar/avatar';

const statusEnum = {
  '1': {
    name: '出售中',
    color: '#52c41a',
  },
  '2': {
    name: '已售罄',
    color: '#ff4d4f',
  },
  '3': {
    name: '已下架',
    color: '#ff4d4f',
  },
  '4': {
    name: '回收站',
    color: '#d9d9d9',
  },
  '100': {
    name: '库存预警',
    color: '#fff000',
  },
}

const ProductManageList = () => {
  const history = useHistory();

  const tabs = {
    defaultKey: 0,
    name: 'status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部商品",
        key: 0,
      },
      {
        label: "出售中",
        key: 1,
      },
      {
        label: "已售罄",
        key: 2,
      },
      {
        label: "已下架",
        key: 3,
      },
      {
        label: "库存预警",
        key: 100,
      },
      {
        label: "回收站",
        key: 4,
      },
    ]
  }

  const tools = {
    btns: [
      {
        text: '发布商品',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/product/product-manage/publish-product'
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
    placeholder: '支持商品、收件人信息等模糊搜索',
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
            pathname: '/product/product-manage/publish-product',
            state: {
              id: record.id
            }
          });
        },
      },
      {
        key: '2',
        text: '下架',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '3',
        text: '推广',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '4',
        text: '更多',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '缩略图',
      render: (record) => (
        <Avatar src={record.thumb} size={80} shape="square" />
      ),
      align: 'center',
    },
    {
      title: '商品名称/编号/分类',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.title}
          subTitle={[
            `${record.id}`,
            `${record.classInfo.map((item) => (item.name)).join('/')}`
          ]}
          titleStyle={{ alignItems: 'left' }}
        />
      ),
      width: '25%',
      align: 'left',
    },
    {
      title: '价格(元)',
      // dataIndex: '',
      render: (record) => {
        if (record.price_low !== record.price_high) {
          return <div>
            <div>最低价：￥{record.price_low}</div>
            <div>最高价：￥{record.price_high}</div>
          </div>
        } else {
          return <span>￥{record.price_low}</span>
        }
      },
      align: 'center',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      align: 'center',
    },
    {
      title: '销量',
      dataIndex: 'salenum',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
      align: 'center'
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          type="circle"
          color={statusEnum[record.status]?.color}
          badge_text={statusEnum[record.status]?.name}
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
    <div className="product-manage-list outer-area">
      <div className="product-manage-list-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url="/Goods/MdseManage/getList"
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

export default ProductManageList;