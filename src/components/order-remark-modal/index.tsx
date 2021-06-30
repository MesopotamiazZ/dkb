import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Radio,
  Input
} from 'antd';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { actions } from '../../pages/order/order-manage/store/slice';
import RemarkFlag from '../../components/remark-flag';
import './style.less';

interface IOrderRemarkModal {
  title: string;
  width: string | number;
  // text: string | React.ReactDOM;
  visible: boolean;
  defaultValues: any;
  onOk: (form: any, flag: number) => void;
  onCancel: () => void;
}

const datas = [
  {
    id: 1,
    name: '红色',
    color: '#ff0000'
  },
  {
    id: 2,
    name: '黄色',
    color: '#ffff00'
  },
  {
    id: 3,
    name: '绿色',
    color: '#008000'
  },
  {
    id: 4,
    name: '蓝色',
    color: '#0000ff'
  },
  {
    id: 5,
    name: '紫色',
    color: '#800080'
  },
]

const OrderRemarkModal: React.FC<IOrderRemarkModal> = memo((props) => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    title,
    width,
    // text,
    visible,
    defaultValues,
    onOk,
    onCancel,
  } = props;

  const [curFlag, setCurFlag] = useState(1);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
    setCurFlag(defaultValues.remarkFlag);
  }, [defaultValues])

  // useEffect(() => {
  //   console.log(areas)
  // }, [areas])

  return (
    <Modal
      className="order-remark-modal"
      title={title}
      visible={visible}
      destroyOnClose
      centered
      onOk={() => onOk(form, curFlag)}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      width={width}
    // okButtonProps={{ type: 'primary', danger: true }}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        labelAlign="right"
        requiredMark={false}
        initialValues={{

        }}
      >
        <Form.Item
          label="标记"
          name="remarkFlag"
          required
        >
          <RemarkFlag
            datas={datas}
            flag={curFlag}
            onClick={(id) => {
              setCurFlag(id);
            }}
          />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remarkSeller"
        // rules={[
        //   { required: true, message: '请填写备注' },
        // ]}
        >
          <Input.TextArea placeholder="订单备注由商家添加，仅平台客服和商家可见" />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default OrderRemarkModal;