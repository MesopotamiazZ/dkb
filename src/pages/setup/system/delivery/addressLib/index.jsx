import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Switch,
  message
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../../store/slice';
import { addAddress, updateAddress, delAddress } from '@/services/system';
import DkbTable from '@/components/dkb-table';
import RenderAction from '@/components/renderAction';
import ProSelects3 from '@/components/pro-selects3';
import DelTipModal from '@/components/delete-tip-modal';
import moment from 'moment';
import './style.less';

const ExpressDelivery = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getAddressDetailActionAsync,
    getAreaActionAsync,
    clearCityList,
    clearAreaList,
    clearAddressDetail,
  } = actions;

  let {
    addressDetail,
    provinceList,
    cityList,
    areaList,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const [createAddressModal, setCreateAddressModal] = useState(false);
  const [areas, setAreas] = useState([]);
  const [areas1, setAreas1] = useState([]);
  const [refresh, setRefresh] = useState(false); // 刷新table
  const [curId, setCurId] = useState(''); // 当前是否是编辑，curId有数据就是更新
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);

  /**
   * 获取区域列表
   */
  useEffect(() => {
    dispatch(getAreaActionAsync({ pid: 0, level: 1 }));
  }, [])

  /**
   * 编辑地址赋值
   */
  useEffect(() => {
    if (Object.keys(addressDetail).length) {
      form.setFieldsValue({
        name: addressDetail?.name,
        tel: addressDetail?.tel,
        is_ship: addressDetail?.is_ship,
        is_return: addressDetail?.is_return,
        description: addressDetail?.description,
        address: addressDetail?.address?.address,
      })
      setAreas1(addressDetail?.address?.area_code);
    } else {
      form.setFieldsValue({
        name: '',
        tel: '',
        is_ship: '',
        is_return: '',
        description: '',
        address: '',
      })
      setAreas1([]);
    }
  }, [addressDetail])

  /**
   * 选择行业
   * @param {*} param0 
   */
  const handleSelect = ({ value, index }) => {
    if (index === 1) {
      setAreas([value]);
      dispatch(clearCityList([]));
      dispatch(clearAreaList([]));
      dispatch(getAreaActionAsync({ pid: parseInt(value), level: 2 }));
    } else if (index === 2) {
      setAreas([...areas, value]);
      dispatch(clearAreaList([]));
      dispatch(getAreaActionAsync({ pid: parseInt(value), level: 3 }));
    } else {
      setAreas([...areas, value]);
    }
  }

  /**
   * 新建地址/更新地址
   */
  const createAddressHandle = async () => {
    const values = await form.validateFields();
    if (!curId) {
      const res = await addAddress({
        ...values,
        address: {
          province: provinceList.filter((item) => item.id == values.province)[0].name,
          city: cityList.filter((item) => item.id == values.city)[0].name,
          district: areaList.filter((item) => item.id == values.area)[0].name,
          area_code: [values.province, values.city, values.area],
          address: values.address
        }
      })
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateAddressModal(false);
        dispatch(clearAddressDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateAddress({
        id: curId,
        ...values,
        address: {
          province: provinceList.filter((item) => item.id == values.province)[0].name,
          city: cityList.filter((item) => item.id == values.city)[0].name,
          district: areaList.filter((item) => item.id == values.area)[0].name,
          area_code: [values.province, values.city, values.area],
          address: values.address
        }
      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateAddressModal(false);
      } else {
        message.warning('更新失败');
      }
    }

  }

  const tools = {
    btns: [
      {
        text: '新建地址',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateAddressModal(true);
          setTimeout(() => {
            form.resetFields()
          }, 100);
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
    placeholder: '请输入地址信息',
    searchBtnText: '搜索',
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          dispatch(getAddressDetailActionAsync({ id: record.id }));
          setCurId(record.id);
          setCreateAddressModal(true);
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
      title: '联系人',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      align: 'center',
    },
    {
      title: '所在地',
      render: (record) => (
        <span>
          {record?.address?.area_name[0]}, {record?.address?.area_name[1]}, {record?.address?.area_name[2]}
        </span>
      ),
      align: 'center',
    },
    {
      title: '详细地址',
      render: (record) => (
        <span>{record?.address?.address}</span>
      ),
      align: 'center',
    },
    {
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

  return (
    <div className="address-lib">
      <DkbTable
        // tabs={tabs}
        tools={tools}
        url="/Setting/AddLib/getList"
        row
        // renderCell={renderCell}
        columns={columns}
        rowKey="id"
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        refresh={refresh}
      />
      <Modal
        className="create-address-modal"
        title={!curId ? '新建地址' : '更新地址'}
        visible={createAddressModal}
        destroyOnClose
        width={620}
        okText={!curId ? '新建地址' : '更新地址'}
        cancelText="取消"
        onOk={() => createAddressHandle()}
        onCancel={() => {
          setCreateAddressModal(false);
          dispatch(clearAddressDetail({}));
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            is_ship: true,
            is_return: true,
          }}
        // colon={false}
        >
          <Form.Item
            label="联系人"
            name="name"
            rules={[
              { required: true, message: '请填写联系人名称' },
            ]}
          >
            <Input type="text" placeholder="请填写联系人名称" className="input-height" />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="tel"
            rules={[
              { required: true, message: '请填写联系电话' },
            ]}
          >
            <Input type="text" placeholder="请填写联系电话" className="input-height" />
          </Form.Item>
          <Form.Item
            label="所在地"
            name="loc"
            required
            style={{ marginBottom: 0 }}
          >
            <ProSelects3
              form={form}
              provinceList={provinceList}
              cityList={cityList}
              areaList={areaList}
              handleSelect={handleSelect}
              selects={areas1}
            />
          </Form.Item>
          <Form.Item
            label="详细地址"
            name="address"
            rules={[
              { required: true, message: '请填写详细地址' },
            ]}
          >
            <Input type="text" placeholder="请填写详细地址" className="input-height" />
          </Form.Item>
          <Form.Item
            label="发货地址"
            name="is_ship"
            // rules={[
            //   { required: true, message: '请选择发货地址' },
            // ]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="默认地址"
              unCheckedChildren="其它地址"
            />
          </Form.Item>
          <Form.Item
            label="退货地址"
            name="is_return"
            // rules={[
            //   { required: true, message: '请选择发货地址' },
            // ]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="默认地址"
              unCheckedChildren="其它地址"
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
      {/* 删除 */}
      <DelTipModal
        title="删除地址"
        width={282}
        text={`确认删除【${curRecord?.address?.address}】地址？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await delAddress({ id: curRecord.id });
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

export default ExpressDelivery;