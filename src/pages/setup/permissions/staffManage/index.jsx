/**
 * @author tigris
 * @description 员工管理列表页
 */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Input,
  Select,
  Switch,
  Form,
  message,
  AutoComplete,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addStaff, updateStaff, removeStaff } from '@/services/permissions';
import { validatorPhone, testPhone } from '@/utils';
import _ from 'lodash';
import NP from 'number-precision';
import DkbTable from '@/components/dkb-table';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import DelTipModal from '@/components/delete-tip-modal';
import './style.less';

const StaffManage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getRoleListActionAsync,
    getStaffDetailActionAsync,
    clearStaffDetail,
    getCurAccountInfoActionAsync,
  } = actions;

  let {
    staffDetail,
    roleList,
    account
  } = useSelector(state => state.permissions, shallowEqual) //store数据

  const [curId, setCurId] = useState('');
  const [createStaffModal, setCreateStaffModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);

  /**
   * 获取角色列表
   */
  useEffect(() => {
    dispatch(getRoleListActionAsync({ page: 1, limit: 20 }));
  }, [])

  /**
  * 编辑地址赋值
  */
  useEffect(() => {
    if (Object.keys(staffDetail).length) {
      form.setFieldsValue({
        userPhone: staffDetail?.userInfo?.phone,
        name: staffDetail.name,
        tel: staffDetail?.tel,
        roleId: Number(staffDetail?.roleId),
        is_check: staffDetail?.is_check,
        status: staffDetail?.status,
      })
    } else {
      form.resetFields()
    }
  }, [staffDetail])

  /**
   * 新建地址/更新地址
   */
  const createAndEditStaffHandle = async () => {
    const values = await form.validateFields();
    if (!curId) {
      const res = await addStaff({
        ...values,

      })
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateStaffModal(false);
        dispatch(clearStaffDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateStaff({
        id: curId,
        ...values,

      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateStaffModal(false);
      } else {
        message.warning('更新失败');
      }
    }

  }

  const tools = {
    btns: [
      {
        text: '新建员工',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateStaffModal(true);
          setTimeout(() => {
            form.resetFields()
          }, 100)
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
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '请输入员工信息',
    searchBtnText: '搜索',
  }

  /**
   * auto-complete onsearch
   */
  const onSearch = _.debounce(async (val) => {
    if (testPhone(val)) {
      dispatch(getCurAccountInfoActionAsync({
        phone: val
      }));
    }
  }, 500)

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          dispatch(getStaffDetailActionAsync({ id: record.id }))
          setCurId(record.id);
          setCreateStaffModal(true);
        },
      },
      {
        key: '2',
        text: '删除',
        type: 'link',
        title: '员工',
        onActionClick: async () => {
          const res = await removeStaff({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
          // setCurRecord(record);
          // setTimeout(() => {
          //   setDelTipModal(true);
          // }, 0)
        },
      },
    ]
  }

  const columns = [
    {
      title: '员工账号',
      dataIndex: 'userInfo',
      render: (text) => (
        <span>{text?.phone}</span>
      ),
      align: 'left',
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
      align: 'left',
    },
    {
      title: '员工角色',
      dataIndex: 'roleInfo',
      render: (text) => (
        <span>{text?.name}</span>
      ),
      align: 'left',
    },
    {
      title: '二次验证',
      dataIndex: 'is_check',
      render: (text) => (
        <span>{text ? '是' : '否'}</span>
      ),
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
    <div className="staff-manage outer-area">
      <div className="staff-manage-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Setting/Staff/getList'
              : '/Setting/Staff/getList/smartSearch'
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
      <>
        <Modal
          className="create-staff-modal"
          title={!curId ? '新建员工' : '更新员工'}
          visible={createStaffModal}
          destroyOnClose={true}
          width={570}
          centered
          okText="确定"
          cancelText="取消"
          onOk={() => {
            // createAddressHandle()
            createAndEditStaffHandle();
          }}
          onCancel={() => {
            setCreateStaffModal(false);
            // dispatch(clearAddressDetail({}));
          }}
        >
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            labelAlign="right"
            requiredMark={false}
            initialValues={{
              is_check: true,
              status: true,
            }}
          // colon={false}
          >
            <Form.Item
              label="员工账号"
              name="userPhone"
              rules={[
                { required: true, message: '请填写员工账号' },
                validatorPhone
              ]}
            >
              <AutoComplete
                placeholder="请输入员工手机号"
                className="input-height"
                options={[{ label: account.phone ? `(${account?.name})${account?.phone}` : '', value: account?.phone }]}
                onSearch={onSearch}
              // 18510974721
              />
              {/* <Input type="text" placeholder="请填写员工账号" className="input-height" disabled={curId} /> */}
            </Form.Item>
            <Form.Item
              label="员工姓名"
              name="name"
              rules={[
                { required: true, message: '请填写员工姓名' },
              ]}
            >
              <Input type="text" placeholder="请填写员工姓名" className="input-height" />
            </Form.Item>
            <Form.Item
              label="联系方式"
              name="tel"
              rules={[
                { required: true, message: '请填写员工联系方式' },
              ]}
            >
              <Input type="text" placeholder="请填写员工联系方式" className="input-height" />
            </Form.Item>
            <Form.Item
              label="员工角色"
              name="roleId"
              rules={[
                { required: true, message: '请填写联系方式' },
              ]}
            >
              <Select
                allowClear
                placeholder='请选择员工角色'
              // className="input-height input-width"
              >
                {roleList?.list?.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item
              label="双重验证"
              name="status"
              // rules={[
              //   { required: true, message: '请选择发货地址' },
              // ]}
              valuePropName="checked"
            >
              <Switch
              // checkedChildren="开启"
              // unCheckedChildren="关闭"
              />
            </Form.Item>
            <Form.Item
              label="员工状态"
              name="is_check"
              // rules={[
              //   { required: true, message: '请选择发货地址' },
              // ]}
              valuePropName="checked"
            >
              <Switch
              // checkedChildren="开启"
              // unCheckedChildren="禁用"
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 删除 */}
        <DelTipModal
          title="删除员工"
          width={282}
          text={`确认删除【${curRecord?.name}】员工？`}
          visible={delTipModal}
          onCancel={() => setDelTipModal(false)}
          onOk={async () => {
            const res = await removeStaff({ id: curRecord.id });
            if (res.code === 200) {
              message.success('删除成功');
              setDelTipModal(false);
              setRefresh(!refresh);
            } else {
              message.warning('删除失败');
            }
          }}
        />
      </>
    </div>
  )
}

export default StaffManage;