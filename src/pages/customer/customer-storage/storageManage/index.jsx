import React, { useState } from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
// import { useHistory, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { actions } from '../store/slice';
import { addVcMoneyDetail } from '@/services/customer';
import ProUpload from '@/components/pro-upload';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import moment from 'moment';
import { validatorPositiveNumber } from '@/utils';
import { baseUrl } from '@/utils/upload';

import './style.less';

const StorageManage = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const [form] = Form.useForm();

  // const {

  // } = actions;

  // let {

  // } = useSelector(state => state['customer-manage'], shallowEqual) //store数据

  const [refresh, setRefresh] = useState(false);
  const [accountModal, setAccountModal] = useState(false);

  const tabs = {
    defaultKey: 1,
    name: 'status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部储值",
        key: 1,
      },
      {
        label: "余额入账",
        key: 2,
      },
      {
        label: "余额支出",
        key: 3,
      },
    ]
  }

  /**
   * 储值调帐
   */
  const addAccountModal = async () => {
    const values = await form.validateFields();
    const res = await addVcMoneyDetail({
      ...values,
      amount: parseInt(values.amount).toFixed(2),
      paper: baseUrl + values?.paper[0]?.path,
    });
    if (res.code === 200) {
      message.success('新建成功');
      setRefresh(!refresh);
      setAccountModal(false);
    } else {
      message.warning('新建失败');
    }
  }

  const tools = {
    btns: [
      {
        text: '储值调帐',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setAccountModal(true);
          setTimeout(() => {
            form.resetFields()
          }, 100);
        }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入流水号',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      onClick: () => { }
    }
  }

  const columns = [
    {
      title: '流水号',
      dataIndex: 'num',
      align: 'left',
    },
    {
      title: '客户',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.userInfo?.phone}
          subTitle={record?.userInfo?.name}
        />
      ),
      align: 'center',
    },
    {
      title: '变更前',
      dataIndex: 'oldmoney',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (text) => (
        text ? `+${text}` : ''
      ),
      align: 'center',
    },
    {
      title: '变更后',
      dataIndex: 'newmoney',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '操作人',
      render: (record) => (
        <span>{record?.opUserInfo?.name}</span>
      ),
      align: 'center',
    },
    {
      title: '日期',
      render: (record) => {
        if (record?.create_at) {
          return moment(parseInt(record?.create_at) * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      align: 'center',
    },
  ]

  return (
    <div className="storage-manage outer-area">
      <div className="storage-manage-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url="/Scrm/VcMoney/getList"
          // row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      {/* 储值调帐 */}
      <Modal
        className="create-customer-modal"
        title='储值调账'
        visible={accountModal}
        destroyOnClose
        width={620}
        okText='确定'
        cancelText="取消"
        onOk={() => addAccountModal()}
        onCancel={() => {
          setAccountModal(false);
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            type: '1'
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
            <Input type="text" placeholder="请填写联系客户账号" className="input-height" />
          </Form.Item>
          <Form.Item
            label="调账类型"
            name="type"
            rules={[
              { required: true, message: '请选择调账类型' },
            ]}
          >
            <Radio.Group>
              <Radio value="1">
                入账
              </Radio>
              <Radio value="2">
                出账
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="调整金额"
            name="amount"
            rules={[
              { required: true, message: '请填写调整金额' },
              validatorPositiveNumber,
            ]}
          >
            <Input prefix="￥" suffix="RMB" className="input-height" />
          </Form.Item>
          <Form.Item
            key="paper"
            label="操作凭证"
            name="paper"
          >
            <ProUpload
              imageParams={{}}
              actionUrl={baseUrl}
              imgUrl={baseUrl}
              is_only={1}
              accept='.png,.jpg,.jpeg,.svg'
              defaultList={[]}
              onChange={(pics) => {
                console.log(baseUrl + pics[0]?.path);
              }}
            />
          </Form.Item>
          <Form.Item
            label="操作备注"
            name="description"
            rules={[
              { required: true, message: '请填写操作备注' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default StorageManage;