import React, { memo } from 'react';
import { Form, Input, Button, Select, Space, Col, DatePicker, TimePicker } from 'antd';
import './index.less'

const { Option } = Select;
const { RangePicker } = DatePicker;

interface formPropsTpe {
    search?: any,
    config?: any,
    layoutConfig?: any
}

interface propsType {
    formProps?: any,
    circle: Boolean,
    submit: (any) => void
}

const tailLayout = {
    // wrapperCol: {
    //     // offset: 8,
    //     span: 24,
    // },
    // labelCol: {
    //     span: 24,
    //     flex: 2
    // }
};

export default memo((props: propsType) => {

    const [form] = Form.useForm();
    const { formProps, submit, circle } = props

    /**
     * 表单提交， 提交时会过滤空值
     * @param {Object} values 
     */
    const onFinish = (values) => {
        const FormFields = form.getFieldsValue();
        const fields = {}
        for (let key in FormFields) {
            if (FormFields[key] !== undefined && FormFields[key] !== '') {
                (fields[key] = FormFields[key])
            }
        }
        submit(fields);
    };

    /**
     * 表单重置
     */
    const onReset = () => {
        form.resetFields();
    };


    return (
        // {...formProps?.layoutConfig}
        <Form layout="inline" form={form} name="control-hooks" onFinish={onFinish} className={`pro-table-form-wrap ${circle ? 'pro-table-form-circle' : ''}`}>

            {formProps?.search && renderForm(formProps.search)}

            <Form.Item {...tailLayout} className="form-footer">
                <Space>
                    <Button htmlType="button" onClick={onReset} className="btn-default">
                        {formProps?.config?.reset?.text || '重置'}
                    </Button>
                    <Button type="primary" htmlType="submit" className="btn-primary">
                        {formProps?.config?.submit?.text || '查询'}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
})


/**
 * 渲染搜索表单
 * @param {Array} search 表单配置数组
 */
const renderForm = (search) => {

    /**
     * 渲染input类型
     * @param {String} type input类型 
     * @param {Object} searchProps input配置项 
     */
    const renderFormEle = (type, searchProps) => {
        type = type.toLowerCase();
        let ele: React.ReactElement;

        switch (type) {

            case 'input':
                ele = <Input allowClear {...searchProps} />;
                break;

            case 'select':
                ele = <Select allowClear {...searchProps} >
                    {searchProps.enum.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                </Select>
                break;

            case 'rangepicker':
                ele = <RangePicker allowClear  {...searchProps} />
                break;

            case 'datepicker':
                ele = <DatePicker allowClear {...searchProps} />
                break;
            case 'timepicker ':
                ele = <TimePicker allowClear  {...searchProps} />
                break;

            default:
                ele = <Input allowClear  {...searchProps} />
        }

        return ele
    }

    return search.map(item => {
        return (
            // <Col key={item.wrap.name} xs={24} sm={24} xl={8} {...item.wrap.col}>
            <Form.Item colon={false}  {...item.wrap} >
                {renderFormEle(item.wrap.type, item.props)}
            </Form.Item>
            // </Col>
        )
    })
}
