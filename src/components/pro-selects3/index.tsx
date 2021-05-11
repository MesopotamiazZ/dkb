import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import './style.less';

const Level3Select = (props) => {
  const {
    provinceList,
    cityList,
    areaList,
    handleSelect,
    form,
    selects,
  } = props;

  // const [selects] = useState(selects);

  useEffect(() => {
    console.log('selects', selects);
    if (selects.length === 1) {
      handleSelect({ value: selects[0], index: 1 });
      form.setFieldsValue({ province: selects[0] });
    } else if (selects.length === 2) {
      handleSelect({ value: selects[1], index: 2 });
      form.setFieldsValue({
        province: selects[0],
        city: selects[1],
      });
    } else if (selects.length === 3) {
      handleSelect({ value: selects[0], index: 1 });
      handleSelect({ value: selects[1], index: 2 });
      form.setFieldsValue({
        province: selects[0],
        city: selects[1],
        area: selects[2]
      });
    }
  }, [selects])

  return (
    <div className="level-3-select">
      <Form.Item
        className="pro-select-form-item"
        name="province"
        style={{ width: 135, display: 'inline-block', marginRight: 18 }}
        rules={[{ required: true, message: '请选择省份' }]}
      >
        <Select
          className="select-width"
          placeholder="选择省份"
          onChange={(value) => {
            handleSelect({ value, index: 1 });
            form.setFieldsValue({ city: '' });
            form.setFieldsValue({ area: '' });
          }}
        >
          {provinceList?.length > 0
            && provinceList.map((ind) => (
              <Select.Option key={ind.id} value={`${ind.id}`}>
                {ind.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="pro-select-form-item"
        name="city"
        style={{ width: 135, display: 'inline-block', marginRight: 18 }}
        rules={[{ required: true, message: '请选择城市' }]}
      >
        <Select
          className="select-width"
          placeholder="选择城市"
          onChange={(value) => {
            handleSelect({ value, index: 2 });
            form.setFieldsValue({ area: '' });
          }}
        >
          {(provinceList?.length > 0 && cityList?.length > 0)
            ? cityList.map((ind) => (
              <Select.Option key={ind.id} value={`${ind.id}`}>
                {ind.name}
              </Select.Option>
            )) : ''
          }
        </Select>
      </Form.Item>
      <Form.Item
        className="pro-select-form-item"
        name="area"
        style={{ width: 135, display: 'inline-block', marginRight: 18 }}
        rules={[{ required: true, message: '请选择区县' }]}
      >
        <Select
          className="select-width"
          placeholder="选择区县"
          onChange={(value) => handleSelect({ value, index: 3 })}
        >
          {(cityList?.length > 0 && areaList?.length > 0)
            ? areaList.map((ind) => (
              <Select.Option key={ind.id} value={`${ind.id}`}>
                {ind.name}
              </Select.Option>
            )) : ''
          }
        </Select>
      </Form.Item>
    </div>
  )
}

export default Level3Select;