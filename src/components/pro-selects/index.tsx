import React from 'react';
import { Form, Select } from 'antd';
import './style.less';

const Level2Select = (props) => {
  const {
    baseIndustryList,
    thinIndustryList
  } = props;

  const handleSelectIndustry = ({ value, index }) => {
    console.log(value, index)
  }

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
          onChange={(value) => handleSelectIndustry({ value, index: 1 })}
        >
          {baseIndustryList?.length > 0
            && baseIndustryList.map((ind) => (
              <Select.Option key={ind.id} value={`${ind.name}|${ind.id}|${ind.code}|${ind.merchant_category}`}>
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
              <Select.Option key={ind.id} value={`${ind.name}|${ind.id}|${ind.code}`}>
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