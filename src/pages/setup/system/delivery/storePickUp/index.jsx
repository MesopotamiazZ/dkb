import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../../store/slice';
import { updateToogleStore } from '@/services/system';
import ToogleTipWrap from '@/components/toogle-tip-wrap';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import './style.less';

const StorePickUp = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    toogleStoreActionAsync,
  } = actions;

  const initialData = () => {
    dispatch((toogleStoreActionAsync()))
  }

  useEffect(() => {
    initialData()
  }, [])

  let {
    toogleStore,
  } = useSelector(state => state.system, shallowEqual) //store数据
  console.log(toogleStore)

  const tools = {
    btns: [
      {
        text: '新建门店',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/setup/system/add-edit-store',
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
    placeholder: '请输入门店名称',
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
            pathname: '/setup/system/add-edit-store',
            state: { id: record.id }
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
      title: '门店名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '联系人',
      dataIndex: 'su_name',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'su_tel',
      align: 'center',
    },
    {
      title: '门店地址',
      render: (record) => (
        <span>{record?.address?.address}</span>
      ),
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
    },
  ]

  const onStorePickUp = async (checked) => {
    console.log(checked)
    const res = await updateToogleStore({ is_express: checked });
    if (res.code === 200) {
      dispatch(toogleStoreActionAsync());
    }
  }
  return (
    <div className="store-pick-up">
      <ToogleTipWrap
        isOpen={toogleStore?.is_express}
        title="门店自提"
        content="启用上门自提后，买家可以就近选择商品自提门店，
        买家下单后，您需要确保买家指定的自提门店商品库存充足。"
        onToogle={onStorePickUp}
      />
      <DkbTable
        // tabs={tabs}
        tools={tools}
        url="/Setting/Stores/getList"
        row
        // renderCell={renderCell}
        columns={columns}
        rowKey="id"
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
      />
    </div>
  )
})

export default StorePickUp;