import React from 'react';
import { Form, Col } from 'antd';
import './style.less';

const FormPageLayout = (props) => {
  const {
    formPageConfig,
    formLayout,
    renderFormItems,
    renderSubmit,
  } = props;

  // const [form] = Form.useForm();

  return (
    <div className="form-page-layout">
      <div className="head-title">
        {formPageConfig.mainTitle}
      </div>
      <div className="form-wrap">
        <Form
          {...formPageConfig.formProps}
          {...formLayout}
        >
          {
            formPageConfig?.subTitle.map((sub, index) => (
              <div className="form-wrap-item" key={sub + index}>
                <Col span={12} offset={6}>
                  <span className="sub-title">{sub}</span>
                  {
                    renderFormItems(index)
                  }
                </Col>
              </div>
            ))
          }
          <div className="form-wrap-item">
            {renderSubmit}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default FormPageLayout