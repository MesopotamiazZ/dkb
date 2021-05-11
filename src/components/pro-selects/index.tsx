import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import './style.less';

const Level2Select = (props) => {
  const {
    baseIndustryList,
    thinIndustryList,
    handleSelectIndustry,
    form,
    selects,
  } = props;

  useEffect(() => {
    console.log('selects', selects);
    if (selects.length === 1) {
      handleSelectIndustry({ value: selects[0], index: 1 });
      form.setFieldsValue({ baseIndustry: selects[0] });
    } else if (selects.length === 2) {
      handleSelectIndustry({ value: selects[0], index: 1 });
      form.setFieldsValue({ baseIndustry: selects[0], thinIndustry: selects[1] });
    }
  }, [selects])

  return (
    <div className="level-2-select">
      <Form.Item
        name="baseIndustry"
        style={{ width: 230, display: 'inline-block', marginRight: 18 }}
        rules={[{ required: true, message: '请选择行业' }]}
      >
        <Select
          className="select-width"
          placeholder="选择行业"
          onChange={(value) => {
            handleSelectIndustry({ value, index: 1 });
            form.setFieldsValue({ thinIndustry: '' })
          }}
        >
          {baseIndustryList?.length > 0
            && baseIndustryList.map((ind) => (
              <Select.Option key={ind.id} value={`${ind.id}`}>
                {ind.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="thinIndustry"
        style={{ width: 230, display: 'inline-block', marginRight: 18 }}
      >
        <Select
          className="select-width"
          placeholder="选择行业"
          onChange={(value) => handleSelectIndustry({ value, index: 2 })}
        >
          {(baseIndustryList?.length > 0 && thinIndustryList?.length > 0)
            ? thinIndustryList.map((ind) => (
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

export default Level2Select;