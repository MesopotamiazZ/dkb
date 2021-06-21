import React, { memo, useState } from 'react';
import { Button, Input, Drawer } from 'antd';
import SelfForm from '../../../filter-form';
import { tableToolsProps } from '../../type';
import './style.less';

const { Search } = Input;

const TableOperatorTools: React.FC<tableToolsProps> = memo((props) => {
  const {
    btns,
    onSearch,
    placeholder,
    searchBtnText,
    filterBtn,
  } = props;

  // const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  return (
    <div className="table-operator-tools">
      {
        btns && <div className="left-tools">
          {
            btns?.map((btn) => (
              <Button
                className="btn-list-style"
                key={btn.text}
                {...btn.antdProps}
                onClick={btn.onClick}
              >
                {btn.text}
              </Button>
            ))
          }
        </div>
      }
      <div className="right-tools">
        <Search
          placeholder={placeholder}
          allowClear
          enterButton={searchBtnText}
          // size="large"
          onSearch={onSearch}
        />
        {
          filterBtn && <Button
            className="btn-list-style"
            {...filterBtn.antdProps}
            onClick={() => setVisible(true)}
          >
            筛选
          </Button>
        }
      </div>
      {
        filterBtn && <Drawer
          title={filterBtn?.formProps?.title}
          width={520}
          placement="right"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
          footer={
            <div
              style={{ textAlign: 'left' }}
            >
              {
                filterBtn?.formProps?.config?.map(item => {
                  return (
                    <Button
                      {...item.wrap}
                      onClick={() => {
                        // 提交数据
                        const FormFields = filterBtn?.formProps?.form.getFieldsValue();
                        // console.log("FormFields",FormFields);
                        if (typeof item.onBtnClick === "function") {
                          if (item.htype === "submit") {
                            filterBtn?.formProps?.form.validateFields().then((values) => {
                              item.onBtnClick(values);
                              setVisible(false);
                            }, () => {
                            });
                          } else if (item.htype === "reset") {
                            filterBtn?.formProps?.form.resetFields();
                            item.onBtnClick(FormFields);
                          } else {
                            item.onBtnClick(FormFields);
                            setVisible(false);
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
            </div>
          }
        >
          <SelfForm
            formProps={filterBtn.formProps}
          />
        </Drawer>
      }
    </div>
  )
})

export default TableOperatorTools;