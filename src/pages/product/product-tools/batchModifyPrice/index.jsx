import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Progress,
  Table,
  Avatar,
  Drawer,
  Button,
  Form,
  message
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import {
  addBatchModifyPrice
} from '@/services/product';
import moment from 'moment';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import SearchTree from '@/components/searchTree';
import SelfForm from '@/components/filter-form';

import './style.less';

const BatchModifyPrice = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getCategoryTreeActionAsync,
    getProductListActionAsync,
  } = actions;

  let {
    categoryTrees,
    productList,
  } = useSelector(state => state['product-tools'], shallowEqual) //store数据

  const [modifyPriceTaskModal, setModifyPriceTaskModal] = useState(false);
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const [selectRows, setSelectRows] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [tableData, setTableData] = useState([]);
  const [curPage, setCurPage] = useState(1);

  const initialData = () => {
    dispatch(getCategoryTreeActionAsync({ pid: 0 })); // 获取商品分类树结构
    dispatch(getProductListActionAsync({ page: 1, limit: 10 }));
  }

  useEffect(() => {
    initialData();
  }, [])

  useEffect(() => {
    setTableData(productList);
  }, [productList])

  const tools = {
    btns: [
      {
        text: '新建改价任务',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setModifyPriceTaskModal(true);
        }
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
      align: 'left',
    },
    {
      title: '改价金额',
      dataIndex: 'money',
      align: 'left',
    },
    {
      title: '改价时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
      align: 'left',
    },
    {
      title: '操作进度',
      render: (record) => (
        <Progress percent={record.progress} size="small" />
      ),
      align: 'left',
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
  ];

  /**
   * 多选配置
   */
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectRowKeys,
    hideOnSinglePage: true,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys, selectedRows);
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    },
    columnWidth: 1,
  };

  /**
     * 分页器事件
     * @param page 
     * @param limit 
     */
  const handlePageChange = (page, limit) => {
    // console.log(page, limit);
    setCurPage(page);
  }

  /**
     * 分页器配置
     */
  const pagination = {
    onChange: handlePageChange,
    // onShowSizeChange: handlePageChange,
    total: tableData?.total,
    // limit: tableData?.limit,
    current: curPage,
    // showSizeChanger: true,
    showTotal: (total) => `总共${total}个商品`,
  }

  const modifyPricecolumns = [
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
      width: '80%',
      align: 'left',
    },
  ];

  const formProps = {
    title: '',
    form,
    initValue: {
      type: 1
    },
    formArr: [
      {
        search: [
          {
            wrap: {
              key: 'type',
              name: 'type',
              label: '改价类型',
              type: 'radio',
            },
            props: {
              enum: [
                { label: '加价', value: 1 },
                { label: '减价', value: 2 }
              ]
            }
          },
          {
            wrap: {
              key: 'price',
              name: 'price',
              label: '改价金额',
              type: 'input',
              rules: [{ required: true, message: '请输入金额' }]
            },
            props: {
              placeholder: '请输入金额',
              type: 'number',
              style: { width: '100%' },
            }
          },
        ]
      }
    ]
  }

  return (
    <div className="batch-modify-price outer-area">
      <div className="batch-modify-price-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Goods/MdseBatch/getToPriceList'
              : '/Goods/MdseBatch/getToPriceList/smartSearch'
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
      {/* 新建改价任务 */}
      <Modal
        className="modify-price-modal"
        title="添加改价商品"
        visible={modifyPriceTaskModal}
        width={980}
        onOk={() => setDrawerVisible(true)}
        okText="下一步"
        cancelText="取消"
        destroyOnClose
        // onOk={() => {
        //   // setData(data.concat({ areas: checkedList.join(','), id: `${Date.now()}` }));
        //   // setCheckedList([]);
        //   // setIndeterminate(false);
        //   // setModifyPriceTaskModal(false);
        // }}
        onCancel={() => setModifyPriceTaskModal(false)}
      >
        <div className="modify-price-modal-wrap">
          <div className="wrap-left">
            <SearchTree
              trees={categoryTrees}
            />
          </div>
          <div className="wrap-right">
            <Table
              rowSelection={rowSelection}
              rowKey="id"
              columns={modifyPricecolumns}
              dataSource={productList.list || []}
              pagination={pagination}
            />
          </div>
        </div>
        <Drawer
          title="改价金额"
          placement="right"
          width={300}
          closable={false}
          onClose={() => {
            setDrawerVisible(false)
          }}
          visible={drawerVisible}
          getContainer={false}
          style={{ position: 'absolute' }}
          mask={false}
          footer={
            <div
              style={{ textAlign: 'right' }}
            >
              <Button
                onClick={() => {
                  setDrawerVisible(false);
                }}
                style={{ marginRight: "15px" }}
              >
                取消
              </Button>
              <Button
                type="primary"
                onClick={async () => {
                  const values = await form.validateFields();
                  if (!selectRowKeys.length) {
                    message.warning('请先选择商品');
                    return;
                  }
                  const res = await addBatchModifyPrice({
                    goods: selectRowKeys,
                    type: Number(values.type),
                    money: Number(values.price).toFixed(2),
                  })
                  if (res.code === 200) {
                    message.success('改价成功');
                    setRefresh(!refresh);
                    setDrawerVisible(false);
                    setModifyPriceTaskModal(false);
                  } else {
                    message.warning('改价失败');
                  }
                }}
                style={{ marginRight: "5px" }}
              >
                确定
              </Button>
            </div>
          }
        >
          <SelfForm
            formProps={formProps}
          />
        </Drawer>
      </Modal>
    </div>
  )
})

export default BatchModifyPrice;