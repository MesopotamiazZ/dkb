import React, { memo, useEffect } from 'react';
import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../../store/slice';
import { updateToogleExpress } from '@/services/system';
import ToogleTipWrap from '@/components/toogle-tip-wrap';
import DkbTable from '@/components/dkb-table';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import moment from 'moment';
import './style.less';

const ExpressDelivery = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    toogleExpressActionAsync,
  } = actions;

  let {
    toogleExpress,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const initialData = () => {
    dispatch(toogleExpressActionAsync())
  }

  useEffect(() => {
    initialData()
  }, [])

  const tools = {
    btns: [
      {
        text: '新建运费模板',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          localStorage.removeItem('express_id');
          history.push({
            pathname: '/setup/system/add-edit-express',
          })
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
    placeholder: '请输入运费模板名称',
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
            pathname: '/setup/system/add-edit-express',
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
      key: 'name',
      title: '模板名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      key: 'type',
      title: '计费方式',
      dataIndex: 'type',
      render: (text) => (
        text === 1 ? <Tag>按件计费</Tag> : <Tag>按重量计费</Tag>
      ),
      align: 'center',
    },
    // {
    //   key: 'price',
    //   title: '首(重/件)价格',
    //   dataIndex: '',
    //   // render: (text) => {
    //   //   if (text) {
    //   //     return <span>￥{text}</span>
    //   //   } else {
    //   //     return null
    //   //   }
    //   // },
    //   align: 'center',
    // },
    {
      key: 'update_at',
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
      key: 'operactor',
      title: '操作',
      render: (record) => (
        <RenderAction
          record={record}
          type="row"
          getBtns={() => getBtns(record)}
        />
      ),
      align: 'center',
    },
  ]

  /**
   * 切换开关状态
   * @param {*} checked 
   */
  const onExpressDilivery = async (checked) => {
    console.log(checked)
    // dispatch(updateToogleExpressActionAsync({ is_express: checked }));
    const res = await updateToogleExpress({ is_express: checked });
    if (res.code === 200) {
      dispatch(toogleExpressActionAsync());
    }
  }

  return (
    <div className="express-delivery">
      <ToogleTipWrap
        isOpen={toogleExpress?.is_express}
        title="快递配送"
        content="启用快递配送后，买家下单可以选择快递发货，由您安排快递送货上门。"
        onToogle={onExpressDilivery}
      />
      <DkbTable
        // tabs={tabs}
        tools={tools}
        url="/Setting/Express/getList"
        row
        // renderCell={renderCell}
        columns={columns}
        rowKey="id"
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
      />
      {/* <Table dataSource={dataSource} columns={columns} /> */}
    </div>
  )
})

export default ExpressDelivery;