import React, { memo, useEffect } from 'react'
import { Form, Input, Button, Select, Checkbox, Space, Col, DatePicker, TimePicker, Radio } from 'antd';
import ProCheckbox from "@/components/pro-checkbox"
import ProUpload from "@/components/pro-upload"
import ProFormList from "./child/pro-form-list"
import ProSelects from '@/components/pro-selects'
import './index.less'
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default memo(function ({ formProps = {} }) {
    const [form] = Form.useForm();
    useEffect(() => {
        console.log("inint", formProps?.initValue)
        form.setFieldsValue(formProps?.initValue);
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
                    ele = <ProSelects {...searchProps} form={form} />
                    break;
                default:
                    ele = <Input allowClear   {...searchProps} className="input-height input-width" />
            }
            return ele
        }

        return search.map((item, index) => {
            return (
                <div className="form-item-line" key={item.wrap.name + index}>
                    <Form.Item colon={false}  {...item.wrap} key={item.wrap.name}>
                        {renderFormEle(item.wrap.type, item.props)}
                    </Form.Item>
                </div>
            )
        })
    }
    return (
        <div className="form-page-layout">
            {/* <div className="head-title">
                {formProps?.propTitle}
            </div> */}
            <div className="form-wrapper">
                <Form
                    layout="block"
                    // {...formProps.layoutConfig}
                    initialValues={{ ...formProps?.initValue }}
                    form={formProps.form || form}

                >
                    <Form.Item style={{ marginBottom: '0', background: "#fff" }} >
                        {formProps?.formArr?.map(item => {
                            return (
                                <div key={item.title} className="form-wrap-item">
                                    <div className="form-wrap-item-inner">
                                        <div className="sub-title">{item.title}</div>
                                        {/* <Col xs={14} sm={14} xl={14} offset={5}> */}
                                        {item.search && renderForm(item.search)}
                                        {/* </div> */}
                                        {/* </Col> */}
                                    </div>
                                </div>
                            )
                        })}
                    </Form.Item>
                    <Form.Item style={{ display: "flex", textAlign: "center", marginBottom: 0 }} >
                        <div className="form-wrap-item form-wrap-btn">
                            {/* <Col xs={14} sm={14} xl={14} offset={5} > */}
                            {
                                formProps?.config?.map((item, index) => {
                                    return (
                                        <Button
                                            key={item.text + index}
                                            {...item.wrap}
                                            onClick={() => {
                                                // 提交数据
                                                const FormFields = form.getFieldsValue();
                                                // console.log("FormFields",FormFields);
                                                if (typeof item.onBtnClick === "function") {
                                                    if (item.htype === "submit") {
                                                        form.validateFields().then((values) => {
                                                            // console.log('数据验证通过', values);
                                                            item.onBtnClick(values);
                                                        }, () => {
                                                        });
                                                    } else if (item.htype === "reset") {
                                                        form.resetFields();
                                                        item.onBtnClick(FormFields);
                                                    } else {
                                                        item.onBtnClick(FormFields);
                                                    }
                                                }

                                            }}
                                            style={{ marginRight: "24px" }}
                                            key={item.text}
                                        >
                                            {item.text}
                                        </Button>
                                    )
                                })
                            }
                            {/* </Col> */}
                        </div>

                    </Form.Item>
                </Form>
            </div>
        </div>
    )
})
