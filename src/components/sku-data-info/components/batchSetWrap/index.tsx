import React, { memo, useEffect, useState } from 'react';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Button
} from 'antd';
import './style.less';

interface specProps {
  id: number;
  name: string;
  reveal: number;
  search: boolean;
  sort: number;
  value: string;
  selects: Array<string>;
}

interface batchSetProps {
  dataSource: Array<specProps>;
  // hasSelects?: any;
  onSetBatchData: (data: any) => void;
}

const BatchSetWrap: React.FC<batchSetProps> = memo((props) => {
  const {
    dataSource,
    onSetBatchData,
  } = props;

  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.validateFields();
    onSetBatchData({ ...values, reveal: dataSource[0].reveal });
    form.resetFields();
  }

  return (
    <div className="batch-set-wrap bg-white">
      <div className="batch-set-label">
        批量设置：
      </div>
      <Form
        layout="inline"
        form={form}
      // onFinish={onFinish}
      >
        {
          dataSource?.filter((item) => {
            return item?.selects?.length > 0
          }).map((item, index) => (
            // <>
            <Form.Item
              key={item.id}
              className="batch-set-item"
              name={`${item.name}`}
              rules={[{ required: true, message: `请选择${item.name}` }]}
            >
              <Select
                placeholder={item.name}
              >
                {
                  item.selects.map((select) => (
                    <Select.Option value={select}>
                      {select}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            // </>
          ))
        }
        <Form.Item
          className="batch-set-item"
          name="price"
        >
          <InputNumber placeholder="价格(元)" />
        </Form.Item>
        <Form.Item
          className="batch-set-item"
          name="stock"
        >
          <InputNumber placeholder="库存(件)" />
        </Form.Item>
        <Form.Item
          className="batch-set-item"
          name="weight"
        >
          <InputNumber placeholder="重量(Kg)" />
        </Form.Item>
        <Form.Item
          className="batch-set-item"
          name="skuCode"
        >
          <Input placeholder="规格编码" />
        </Form.Item>
        <Form.Item
          className="batch-set-item"
          name="barCode"
        >
          <Input placeholder="规格条形码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onFinish}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})

export default BatchSetWrap;