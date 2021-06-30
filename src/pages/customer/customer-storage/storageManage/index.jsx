/**
 * @author tigris
 * @description 储值管理列表页
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Radio, message, AutoComplete } from 'antd';
// import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { actions } from '../../../setup/permissions/store/slice';
import { actions } from '../store/slice';
import { addVcMoneyDetail } from '@/services/customer';
import { parseFilterValue, validatorPhone, testPhone } from '@/utils';
import _ from 'lodash';
import ProUpload from '@/components/pro-upload';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import moment from 'moment';
import { validatorPositiveNumber } from '@/utils';
import { baseUrl } from '@/utils/upload';

import './style.less';
import { useEffect } from 'react';

const StorageManage = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const {
    getStaffListActionAsync,
    getCurAccountInfoActionAsync
  } = actions;

  let {
    account,
    staffList,
  } = useSelector(state => state['customer-storage'], shallowEqual);

  /**
   * initital
   */
  useEffect(() => {
    dispatch(getStaffListActionAsync({ page: 1, limit: 99 }));
  }, []);

  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [accountModal, setAccountModal] = useState(false);
  const [filterObj, setFilterObj] = useState({});

  const tabs = {
    defaultKey: 0,
    name: 'type',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部储值",
        key: 0,
      },
      {
        label: "余额入账",
        key: 1,
      },
      {
        label: "余额支出",
        key: 2,
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
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '请输入流水号',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      formProps: {
        title: '调账筛选',
        form: form1,
        initValue: {},
        formArr: [
          {
            search: [
              {
                wrap: {
                  key: 'phone',
                  name: 'phone',
                  label: '客户账号',
                  type: 'input'
                },
                props: {
                  style: { width: '100%' },
                  placeholder: '请输入客户手机号码',
                }
              },
              {
                wrap: {
                  key: 'date',
                  name: 'date',
                  label: '储值时间',
                  type: 'rangepicker',
                },
                props: {
                  ranges: {
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近7天': [moment().subtract('days', 6), moment()],
                    '近30天': [moment().subtract('days', 29), moment()]
                  }
                }
              },
              {
                wrap: {
                  key: 'op_uid',
                  name: 'op_uid',
                  label: '关联员工(操作人)',
                  type: 'select'
                },
                props: {
                  placeholder: '请选择员工',
                  enum: staffList?.map((item) => ({
                    label: item.name,
                    value: item.id
                  })) || []
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'type',
                  name: 'type',
                  label: '储值类型',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 0
                    },
                    {
                      label: '入账',
                      value: 1
                    },
                    {
                      label: '出账',
                      value: 2
                    },
                  ]
                }
              },
            ],
          }
        ],
        config: [{
          text: "确认",
          wrap: {
            type: "primary"
          },
          htype: "submit", // submit || reset
          onBtnClick: (value) => {
            console.log("按钮点击的事件222", value);
            const obj = parseFilterValue(value)
            setFilterObj(obj);
            setTimeout(() => {
              setRefresh(!refresh);
            }, []);
          }
        },
        {
          text: "取消",
          wrap: {
            //按钮的一些属性配置
          },
          htype: "", // submit || reset
          onBtnClick: (value) => {
            //value 返回的是表单的数据
            // type=submit 按钮有提交功能 会自动数据验证
            // type=reset  重置表单
            // 其余的不用传type值
            console.log("按钮点击的事件111", value);
            setFilterObj({});
            form1.resetFields();
            setTimeout(() => {
              setRefresh(!refresh);
            }, []);
          }
        }],
      }
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
      align: 'left',
    },
    {
      title: '变更前',
      dataIndex: 'oldmoney',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'left',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (text) => (
        text ? `+${text}` : ''
      ),
      align: 'left',
    },
    {
      title: '变更后',
      dataIndex: 'newmoney',
      render: (text) => {
        if (text) {
          return <span>￥{text}</span>
        }
      },
      align: 'left',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'left',
    },
    {
      title: '操作人',
      render: (record) => (
        <span>{record?.opUserInfo?.name}</span>
      ),
      align: 'left',
    },
    {
      title: '日期',
      render: (record) => {
        if (record?.create_at) {
          return moment(parseInt(record?.create_at) * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      align: 'left',
    },
  ]

  return (
    <div className="storage-manage outer-area">
      <div className="storage-manage-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Scrm/VcMoney/getList'
              : '/Scrm/VcMoney/getList/smartSearch'
          }
          requestData={
            !keywords ? Object.assign({}, filterObj)
              : Object.assign({ keywords }, filterObj)
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
      {/* 储值调帐 */}
      <Modal
        className="create-customer-modal"
        title='储值调账'
        visible={accountModal}
        destroyOnClose
        width={620}
        centered
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
              validatorPhone,
            ]}
          >
            <AutoComplete
              placeholder="请输入客户手机号"
              className="input-height"
              options={[{ label: account.phone ? `(${account?.name})${account?.phone}` : '', value: account?.phone }]}
              onSearch={onSearch}
            // 18510974721
            />
            {/* <Input type="text" placeholder="请填写联系客户账号" className="input-height" /> */}
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