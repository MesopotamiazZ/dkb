import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Switch, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addVcRule, updateVcRule, removeVcRule } from '@/services/customer';
import DkbTable from '@/components/dkb-table';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import { validatorPositiveNumber } from '@/utils';
import DelTipModal from '@/components/delete-tip-modal';
import moment from 'moment';

import './style.less';

const StorageRule = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    clearVcRuleDetail,
    getVcRuleDetailActionAsync,
  } = actions;

  let {
    vcRuleDetail,
  } = useSelector(state => state['customer-storage'], shallowEqual) //store数据

  const [refresh, setRefresh] = useState(false);
  const [createRuleModal, setCreateRuleModal] = useState(false);
  const [curId, setCurId] = useState('');
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(vcRuleDetail).length) {
      form.setFieldsValue({
        name: vcRuleDetail?.name,
        money: vcRuleDetail?.money,
        money_give: vcRuleDetail.money_give,
        status: vcRuleDetail.status,
      })
    }
  }, [vcRuleDetail])

  const addAndEditVcRule = async () => {
    const values = await form.validateFields();
    if (!curId) {
      const res = await addVcRule({
        ...values,
        money: parseInt(values.money).toFixed(2),
        money_give: parseInt(values.money_give).toFixed(2),
      });
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateRuleModal(false);
        dispatch(clearVcRuleDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateVcRule({
        id: curId,
        ...values,
        money: parseInt(values.money).toFixed(2),
        money_give: parseInt(values.money_give).toFixed(2),
      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateRuleModal(false);
      } else {
        message.warning('更新失败');
      }
    }
  }

  const tools = {
    btns: [
      {
        text: '新建规则',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateRuleModal(true);
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
    onSearch: () => { },
    placeholder: '请输入规则名称',
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
          dispatch(getVcRuleDetailActionAsync({ id: record.id }));
          setCurId(record.id);
          setCreateRuleModal(true);
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
      title: '规则名称',
      dataIndex: 'name',
      width: '30%',
      align: 'left',
    },
    {
      title: '储值面额',
      dataIndex: 'money',
      render: (text) => {
        if (text) {
          return (
            <span>￥ {text}</span>
          )
        }
      },
      align: 'center',
    },
    {
      title: '赠送金额',
      dataIndex: 'money_give',
      render: (text) => {
        if (text) {
          return (
            <span>￥ {text}</span>
          )
        }
      },
      align: 'center',
    },
    {
      title: '创建时间',
      render: (record) => {
        if (record?.create_at) {
          return moment(parseInt(record?.create_at) * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      align: 'center',
    },
    {
      title: '规则状态',
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
    <div className="storage-rule outer-area">
      <div className="storage-rule-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Scrm/VcRule/getList"
          row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      {/* 新建储值规则 */}
      <Modal
        className="create-customer-modal"
        title={!curId ? '新建规则' : '更新规则'}
        visible={createRuleModal}
        destroyOnClose
        width={620}
        okText={!curId ? '新建规则' : '更新规则'}
        cancelText="取消"
        onOk={() => addAndEditVcRule()}
        onCancel={() => {
          setCreateRuleModal(false);
          dispatch(clearVcRuleDetail({}));
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
            label="规则名称"
            name="name"
            rules={[
              { required: true, message: '请填写规则名称' },
            ]}
          >
            <Input type="text" placeholder="请填写规则名称" className="input-height" />
          </Form.Item>
          <Form.Item
            label="储值面额"
            name="money"
            rules={[
              { required: true, message: '请填写储值面额' },
              validatorPositiveNumber,
            ]}
          >
            <Input prefix="￥" suffix="RMB" className="input-height" />
          </Form.Item>
          <Form.Item
            label="赠送金额"
            name="money_give"
            rules={[
              { required: true, message: '请填写赠送金额' },
              validatorPositiveNumber,
            ]}
          >
            <Input prefix="￥" suffix="RMB" className="input-height" />
          </Form.Item>
          <Form.Item
            label="规则状态"
            name="status"
            // rules={[
            //   { required: true, message: '请选择发货地址' },
            // ]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="禁用"
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 确认删除 */}
      <DelTipModal
        title="删除规则"
        width={282}
        text={`确认删除【${curRecord?.name}】规则？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await removeVcRule({ id: curRecord.id });
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

export default StorageRule;