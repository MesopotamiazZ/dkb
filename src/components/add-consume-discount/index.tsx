import React, { useState, memo, useEffect } from 'react';
import {
  Table, Form, Input, Button, message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.less';

interface addConsumeDiscountProps {
  dataSource: Array<any>;
  onGetCondition: (data: any) => void;
}

const AddConsumeDiscount: React.FC<addConsumeDiscountProps> = memo(({ dataSource, onGetCondition }) => {
  const [form] = Form.useForm();

  const [data, setData] = useState(dataSource);

  /**
   * 返回新的打折条件数据
   */
  useEffect(() => {
    onGetCondition(data);
  }, [data])

  const footer = () => {
    return (
      <Button
        className="foot-btn"
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => {
          if (data.length >= 9) {
            message.warning('超过最大添加数量');
            return
          }
          let dataClone = JSON.parse(JSON.stringify(data));
          dataClone.push({
            id: Date.now(),
            meet: '',
            discount: '',
          })
          setData(dataClone);
        }}
      >
        添加消费折扣条件
      </Button >
    )
  }

  const columns = [
    {
      title: '折扣条件',
      align: 'center' as 'center',
      render: (record, _, index) => (
        <div className="discount-condition">
          <span className="span-text">单件商品满</span>
          <Input
            value={record.meet}
            onChange={(e) => {
              let dataClone = JSON.parse(JSON.stringify(data));
              dataClone.forEach((item, i) => {
                if (index === i) {
                  item.meet = e.target.value
                }
              })
              setData(dataClone);
            }}
            type="number"
            addonAfter="元"
            style={{ width: '140px' }}
          />
          <span className="span-text">打</span>
          <Input
            value={record.discount}
            onChange={(e) => {
              let dataClone = JSON.parse(JSON.stringify(data));
              dataClone.forEach((item, i) => {
                if (index === i) {
                  item.discount = e.target.value
                }
              })
              setData(dataClone);
            }}
            type="number"
            addonAfter="折"
            style={{ width: '140px' }}
          />
        </div>
      ),
    },
    {
      title: '操作',
      align: 'center' as 'center',
      render: (record, _, index) => (
        <Button
          type="link"
          onClick={() => {
            let dataClone = JSON.parse(JSON.stringify(data));
            dataClone.forEach((item, i) => {
              if (index === i) {
                dataClone.splice(i, 1);
              }
            })
            setData(dataClone);
          }}
        >
          删除
        </Button>
      ),
    }
  ]

  return (
    <div className="add-consume-discount">
      <Form.Item
        wrapperCol={{
          span: 16
        }}
      >
        <Form form={form} component={false}>
          <Table
            rowKey="id"
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
            footer={footer}
          />
        </Form>
      </Form.Item>
    </div>
  )
});

export default AddConsumeDiscount;