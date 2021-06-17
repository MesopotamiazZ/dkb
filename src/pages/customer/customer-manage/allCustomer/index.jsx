/**
 * @author tigris
 * @description 全部客户列表页
 */
import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  message,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addCustomer, updateCustomer } from '@/services/customer';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import moment from 'moment';

import './style.less';

const AllCustomer = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getCustomerDetailActionAsync,
    clearCustomerDetail,
    getCustomerLevelActionAsync,
    getCustomerTagActionAsync,
  } = actions;

  let {
    customerDetail,
    customerLevelList,
    customerTagList
  } = useSelector(state => state['customer-manage'], shallowEqual) //store数据

  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [createCustomerModal, setCreateCustomerModal] = useState(false);
  const [curId, setCurId] = useState('');
  // const [delTipModal, setDelTipModal] = useState(false);
  // const [curRecord, setCurRecord] = useState(null);

  /**
   * 获取客户等级列表
   */
  useEffect(() => {
    dispatch(getCustomerLevelActionAsync({ page: 1, limit: 20 }));
    dispatch(getCustomerTagActionAsync({ page: 1, limit: 20 }));
  }, [])

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(customerDetail).length) {
      form.setFieldsValue({
        userPhone: customerDetail?.userInfo?.phone,
        levelId: `${customerDetail?.levelInfo?.id}`,
        tagIds: customerDetail?.tagInfo.map((tag) => (`${tag.id}`)),
        description: customerDetail?.description,
        status: customerDetail?.status,
      })
    }
  }, [customerDetail])

  /**
   * 新建/编辑客户
   */
  const addAndEditCustmer = async () => {
    const values = await form.validateFields();
    if (!curId) {
      const res = await addCustomer({
        ...values,
        tagIds: values.tagIds.join(','),
      });
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateCustomerModal(false);
        dispatch(clearCustomerDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateCustomer({
        id: curId,
        ...values,
        tagIds: values.tagIds.join(','),
      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateCustomerModal(false);
      } else {
        message.warning('更新失败');
      }
    }
  }

  const tools = {
    btns: [
      {
        text: '新建客户',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateCustomerModal(true);
          setTimeout(() => {
            form.resetFields()
          }, 100);
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
          dispatch(getCustomerDetailActionAsync({ id: record.id }));
          setCurId(record.id);
          setCreateCustomerModal(true);
        },
      },
      // {
      //   key: '2',
      //   text: '删除',
      //   type: 'link',
      //   onActionClick: () => {
      //     setCurRecord(record);
      //     setTimeout(() => {
      //       setDelTipModal(true);
      //     }, 0)
      //   },
      // },
    ]
  }

  const columns = [
    {
      title: '客户',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.userInfo?.phone}
          subTitle={record?.userInfo?.name}
        />
      ),
      width: '20%',
      align: 'left',
    },
    {
      title: '等级',
      render: (record) => (
        <span>{record?.levelInfo?.name}</span>
      ),
      align: 'left',
    },
    {
      title: '积分',
      dataIndex: 'point',
      align: 'left',
    },
    {
      title: '储值余额',
      dataIndex: 'balance',
      render: (text, record) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'left',
    },
    {
      title: '下单次数',
      dataIndex: 'ordernum',
      render: (text) => (
        text ? <span>{text}</span> : 0
      ),
      align: 'left',
    },
    {
      title: '上次下单时间',
      render: (record) => {
        if (record?.lastOrderTime?.create_at) {
          return moment(parseInt(record?.lastOrderTime?.create_at) * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      align: 'left',
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
    <div className="all-customer outer-area">
      <div className="all-customer-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Scrm/CsrManage/getList'
              : '/Scrm/CsrManage/getList/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      {/* 新建客户 */}
      <Modal
        className="create-customer-modal"
        title={!curId ? '新建客户' : '更新客户'}
        visible={createCustomerModal}
        destroyOnClose
        width={620}
        okText={!curId ? '新建客户' : '更新客户'}
        cancelText="取消"
        onOk={() => addAndEditCustmer()}
        onCancel={() => {
          setCreateCustomerModal(false);
          dispatch(clearCustomerDetail({}));
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            status: true,
          }}
        // colon={false}
        >
          <Form.Item
            label="客户账号"
            name="userPhone"
            rules={[
              { required: true, message: '请填写联系客户账号' },
            ]}
          >
            <Input type="text" placeholder="请填写联系客户账号" className="input-height" disabled={curId} />
          </Form.Item>
          <Form.Item
            label="客户等级"
            name="levelId"
            rules={[
              { required: true, message: '请选择客户等级' },
            ]}
          >
            <Select
              placeholder="请选择客户等级"
            >
              {
                customerLevelList?.list?.map((level) => (
                  <Select.Option key={level.id} value={`${level.id}`}>
                    {level.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="客户标签"
            name="tagIds"
            rules={[
              { required: true, message: '请选择客户标签' },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="请选择客户标签"
              allowClear
            >
              {
                customerTagList?.list?.map((tag) => (
                  <Select.Option key={tag.id} value={`${tag.id}`}>
                    {tag.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="客户状态"
            name="status"
            // rules={[
            //   { required: true, message: '请选择发货地址' },
            // ]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="拉黑"
            />
          </Form.Item>
          <Form.Item
            className="input-textarea"
            label="备注"
            name="description"
            rules={[
              { required: true, message: '请填写备注' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* 确认删除 */}
      {/* <DelTipModal
        title="删除客户"
        width={282}
        text={`确认删除【${curRecord?.name}】客户？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await removeCustomer({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
        }}
      /> */}
    </div>
  )
});

export default AllCustomer;