import React, { memo, useEffect } from 'react'
import {
  Form, Input, Button, Select, Checkbox, Space,
  Row, Col, DatePicker, TimePicker, Radio
} from 'antd';
import ProCheckbox from "@/components/pro-checkbox"
import ProUpload from "@/components/pro-upload"
import ProFormList from "./child/pro-form-list"
import ProSelects from '@/components/pro-selects'
import InputGroupNumber from '../input-group-number';
import './style.less'

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default memo(function ({ formProps = {} }) {
  // const [form] = Form.useForm();

  useEffect(() => {
    // console.log("inint", formProps?.initValue)
    formProps?.form.setFieldsValue(formProps?.initValue);
  }, [formProps?.initValue])

  const renderForm = (search) => {
    /**
     * 渲染input类型
     * @param {String} type input类型 
     * @param {Object} searchProps input配置项 
     */
    const renderFormEle = (type, searchProps) => {
      type = type.toLowerCase();
      let ele;
      switch (type) {
        case 'input':
          ele = <Input allowClear {...searchProps} className="input-height input-width" />;
          break;
        case 'inputgroupnumber':
          ele = <InputGroupNumber {...searchProps} />;
          // ele = <div allowClear {...searchProps}>11111</div>;
          break;
        case 'select':
          ele = <Select allowClear {...searchProps} className="input-height input-width">
            {searchProps.enum.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
          </Select>
          break;

        case 'rangepicker':
          ele = <RangePicker allowClear  {...searchProps} className="input-height input-width" />
          break;
        case 'timepicker':
          ele = <TimePicker allowClear  {...searchProps} className="input-height input-width" />
          break;
        case 'datepicker':
          ele = <DatePicker allowClear  {...searchProps} className="input-height input-width" />
          break;
        case 'radio':
          ele = (<Radio.Group {...searchProps}>
            {
              searchProps.enum.map(item => <Radio value={item.value} key={item.value}>{item.label}</Radio>)
            }
          </Radio.Group>)
          break;
        case 'checkbox':
          ele = (<Checkbox.Group  {...searchProps}>
            {
              searchProps.enum.map(item => <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>)
            }
          </Checkbox.Group>)
          break;
        case 'textarea':
          // className="textarea-height"
          ele = <TextArea allowClear  {...searchProps} />
          break;
        case 'procheckbox':
          ele = <ProCheckbox   {...searchProps} checkbox_group={searchProps.enum} />
          break;
        case 'proupload':
          ele = <ProUpload   {...searchProps} defaultList={searchProps.enum} />
          break;
        case 'proformlist':
          ele = <ProFormList   {...searchProps} formTableArr={searchProps.filedTitle} formName={searchProps.filedName} />
          break;
        case 'proselects':
          ele = <ProSelects {...searchProps} />
          break;
        default:
          ele = <Input allowClear   {...searchProps} className="input-height input-width" />
      }
      return ele
    }

    return search.map(item => {
      return (
        <Col xs={item.col || 24} sm={item.col || 24} xl={item.col || 24}>
          <div className="form-item-line">
            <Form.Item colon={false}  {...item.wrap} key={item.wrap.name}>
              {renderFormEle(item.wrap.type, item.props)}
            </Form.Item>
          </div>
        </Col>
      )
    })
  }
  return (
    <div className="filter-form-page-layout">
      {/* <div className="head-title">
                {formProps?.propTitle}
            </div> */}
      <div className="form-wrapper">
        <Form
          layout="vertical"
          // {...formProps.layoutConfig}
          initialValues={{ ...formProps?.initValue }}
          form={formProps?.form}

        >
          <Form.Item style={{ marginBottom: '0', background: "#fff" }} >
            {formProps?.formArr?.map(item => {
              return (
                <div key={item.title} className="form-wrap-item">
                  <div className="form-wrap-item-inner">
                    <Row gutter={20}>
                      {item.search && renderForm(item.search)}
                    </Row>
                  </div>
                </div>
              )
            })}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})
