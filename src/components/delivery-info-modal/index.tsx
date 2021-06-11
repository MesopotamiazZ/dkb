import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Radio,
  Input,
  message
} from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../../pages/order/order-manage/store/slice';
import ProSelects3 from '../../components/pro-selects3';
import IntelIdentification from '../../components/intel-identification';
import './style.less';

interface IDeliveryInfo {
  title: string;
  width: string | number;
  // text: string | React.ReactDOM;
  visible: boolean;
  defaultValues: any;
  onOk: (form: any) => void;
  onCancel: () => void;
}

const DeliveryInfoModal: React.FC<IDeliveryInfo> = memo((props) => {
  const dispatch = useDispatch();
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

  let {
    provinceList,
    cityList,
    areaList,
  } = useSelector(state => state['order-manage'], shallowEqual) //store数据

  const {
    getAreaActionAsync,
    clearCityList,
    clearAreaList,
  } = actions;

  const [areas, setAreas] = useState([]); // 存储新增的area
  const [areas1, setAreas1] = useState([]); // 存储编辑的area

  useEffect(() => {
    // console.log('defaultValues', defaultValues);
    form.setFieldsValue(defaultValues);
  }, [defaultValues])

  /**
   * 获取区域
   */
  useEffect(() => {
    dispatch(getAreaActionAsync({ pid: 0, level: 1 }));
  }, [])

  /**
   * 选择行业
   * @param {*} param0 
   */
  const handleSelect = ({ value, index }) => {
    // console.log('value', value)
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
   * 返回addCode数组
   * @param addCode 
   * @returns 
   */
  const parseAddCodeArr = (areaCode: any) => {
    let provinceCode = '';
    let cityCode = '';
    let arr1 = areaCode.split('');
    let arr2 = areaCode.split('');
    arr1.splice(3, 3, '0', '0', '0');
    arr2.splice(4, 2, '0', '0');
    provinceCode = arr1.join('');
    cityCode = arr2.join('');
    // console.log('arr1', provinceCode, cityCode)
    return [provinceCode, cityCode, areaCode]
  }

  /**
   * 自动识别
   * @param data 
   */
  const handleGetAddress = (data) => {
    // console.log(data)
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        phone: data?.mobile,
        address: data?.details,
        // addCode: data.code
      });
      setAreas1(parseAddCodeArr(data?.code));
    } else {
      message.warning('识别有误');
    }
  }

  // useEffect(() => {
  //   console.log(areas)
  // }, [areas])

  return (
    <Modal
      className="delivery-info-modal"
      title={title}
      visible={visible}
      destroyOnClose
      onOk={() => onOk(form)}
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
          delivery: '1'
        }}
      >
        <Form.Item
          label="配送方式"
          name="delivery"
          rules={[
            { required: true, message: '请选择配送方式' },
          ]}
        >
          <Radio.Group>
            <Radio value={'1'}>物流配送</Radio>
            <Radio value={'2'}>门店自提</Radio>
            <Radio value={'3'}>商家配送</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="智能填写"
        >
          <IntelIdentification
            form={form}
            onGetAddress={(data) => handleGetAddress(data)}
          />
        </Form.Item>
        <Form.Item
          label="联系人"
          name="name"
          rules={[
            { required: true, message: '请填写联系人姓名' },
          ]}
        >
          <Input placeholder="请填写联系人姓名" className="input-height" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            { required: true, message: '请填写联系电话' },
          ]}
        >
          <Input placeholder="请填写联系电话" className="input-height" />
        </Form.Item>
        <Form.Item
          label="行政区域"
          name="addCode"
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
          <Input placeholder="请填写详细地址" className="input-height" />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default DeliveryInfoModal;