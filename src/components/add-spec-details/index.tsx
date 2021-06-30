import React, { useState, memo, useEffect } from 'react';
import {
  Table,
  Form,
  Input,
  Button,
  message,
  InputNumber,
  Switch,
  Modal,
  Radio
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { revealEnum } from '../../utils/enum';
// import RenderAction from '../renderAction';
import './style.less';

const revealArr = [
  '',
  '文字',
  '图片'
];

interface specValueData {
  id?: string | number;
  specVal?: string | number;
}

interface specDetails {
  id?: string | number;
  name?: string;
  reveal?: string | number;
  value?: Array<string | number>;
  search?: boolean;
  sort?: number;
  specData?: any;
}

// interface dataSourceProps {
//   name?: string;
//   sort?: number;
//   status?: boolean;
//   spec?: Array<specDetails>;
// }

interface addSpecDetailsProps {
  dataSource: Array<any>;
  onGetDetails: (data: any) => void;
}

const AddSpecDetails: React.FC<addSpecDetailsProps> = memo(({ dataSource = [], onGetDetails }) => {
  const [form] = Form.useForm();

  const [specs, setSpecs] = useState<Array<specDetails>>([]); // 规格明细
  const [spec, setSpec] = useState<specDetails>({}); // 单个规格明细
  const [addSpecModal, setAddSpecModal] = useState<boolean>(false); // 新增规格modal
  const [specData, setSpecData] = useState<Array<specValueData>>([]); // 新增规格modal --》 规格值
  const [specDataTemp, setSpecDataTemp] = useState<Array<specValueData>>([
    {
      id: Date.now(),
      specVal: ''
    }
  ]); // 新增规格modal --》 规格值（临时数据）

  console.log(2222, specDataTemp);

  useEffect(() => {
    if (dataSource.length) {
      setSpecs(dataSource.map((item) => ({
        ...item,
        specData: item.value.map((val, index) => ({
          id: index,
          specVal: val,
        }))
      })));
    }
  }, [dataSource])

  /**
   * 返回新的打折条件数据
   */
  useEffect(() => {
    // console.log('finally', specs)
    onGetDetails(specs);
  }, [specs])

  /**
   * 单个规格明细改变
   */
  useEffect(() => {
    // console.log('spec', spec)
    if (Object.keys(spec).length) {
      let specsClone = JSON.parse(JSON.stringify(specs));
      const ids = specsClone.map((item) => (item.id));
      if (ids.indexOf(spec.id) !== -1) {
        specsClone.forEach((item, index) => {
          if (item.id === spec.id) {
            specsClone[index] = spec;
          }
        })
      } else {
        specsClone.push(spec);
      }
      setSpecs(specsClone);
    }
  }, [spec])

  useEffect(() => {
    setSpecDataTemp(specData);
  }, [specData])

  const specFooter = () => {
    return (
      <Button
        className="foot-btn"
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => {
          // if (data.length >= 20) {
          //   message.warning('超过最大添加数量');
          //   return
          // }
          console.log('specDataTemp', specDataTemp);
          let dataClone = JSON.parse(JSON.stringify(specDataTemp));
          dataClone.push({
            id: Date.now(),
            specVal: ''
          })
          setSpecDataTemp(dataClone);
        }}
      >
        增加
      </Button >
    )
  }

  const footer = () => {
    return (
      <Button
        className="foot-btn"
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => {
          // if (data.length >= 20) {
          //   message.warning('超过最大添加数量');
          //   return
          // }
          form.resetFields();
          setSpecDataTemp([
            {
              id: Date.now(),
              specVal: ''
            }
          ]);
          setAddSpecModal(true);
        }}
      >
        新增规格
      </Button >
    )
  }

  const specColumns = [
    {
      title: '名称',
      align: 'center' as 'center',
      render: (record, _, index) => (
        <Input
          value={record.specVal}
          onChange={(e) => {
            let dataClone = JSON.parse(JSON.stringify(specDataTemp));
            dataClone.forEach((item) => {
              if (item.id === record.id) {
                item.specVal = e.target.value;
              }
            })
            setSpecDataTemp(dataClone);
          }}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: '操作',
      align: 'center' as 'center',
      render: (record) => (
        <div className="operactor-link-btn">
          <Button type="link" onClick={() => {
            let dataClone = JSON.parse(JSON.stringify(specDataTemp));
            let current = null;
            let prev = null;
            dataClone.forEach((item, index) => {
              if (item.id === record.id) {
                current = item;
                if (index - 1 >= 0) {
                  prev = dataClone[index - 1];
                  dataClone[index] = prev;
                  dataClone[index - 1] = current;
                }
              }
            })
            setSpecDataTemp(dataClone);
          }}>
            上移
          </Button>
          <Button type="link" onClick={() => {
            let dataClone = JSON.parse(JSON.stringify(specDataTemp));
            let current = null;
            let next = null;
            let flag = true;
            dataClone.forEach((item, index) => {
              if (item.id === record.id && flag) {
                current = item;
                if (index + 1 <= dataClone.length - 1) {
                  next = dataClone[index + 1];
                  dataClone[index] = next;
                  dataClone[index + 1] = current;
                  flag = false;
                }
              }
            })
            setSpecDataTemp(dataClone);
          }}>
            下移
          </Button>
          <Button type="link" onClick={() => {
            let dataClone = JSON.parse(JSON.stringify(specDataTemp));
            dataClone.forEach((item, index) => {
              if (item.id === record.id) {
                dataClone.splice(index, 1);
              }
            })
            setSpecDataTemp(dataClone);
          }}>
            删除
          </Button>
        </div>
      )
    }
  ]

  const columns = [
    {
      title: '排序',
      align: 'center' as 'center',
      render: (record, _, index) => (
        <InputNumber
          min={0}
          value={record.sort}
          onChange={(val) => {
            let specsClone = JSON.parse(JSON.stringify(specs));
            specsClone.forEach((item) => {
              if (item.id === record.id) {
                item.sort = val
              }
            })
            setSpecs(specsClone);
          }}
        />
      ),
      width: '10%',
    },
    {
      title: '规格名称',
      dataIndex: 'name',
      align: 'center' as 'center',
      width: '15%',
    },
    {
      title: '展示形式',
      dataIndex: 'reveal',
      align: 'center' as 'center',
      render: (text) => {
        return (
          <span>{revealArr[text]}</span>
        )
      },
      width: '15%'
    },
    {
      title: '规格值',
      dataIndex: 'value',
      align: 'center' as 'center',
      width: '35%'
    },
    {
      title: '参与筛选',
      dataIndex: 'search',
      align: 'center' as 'center',
      render: (text, record) => (
        <Switch
          // checkedChildren=""
          // unCheckedChildren=""
          checked={text}
          onChange={(checked) => {
            let specsClone = JSON.parse(JSON.stringify(specs));
            specsClone.forEach((item) => {
              if (item.id === record.id) {
                item.search = checked
              }
            })
            setSpecs(specsClone);
          }}
        />
      ),
    },
    {
      title: '操作',
      render: (record) => (
        <div className="operactor-link-btn">
          <Button type="link" onClick={() => {
            // console.log('编辑', record)
            setAddSpecModal(true);
            setTimeout(() => {
              form.setFieldsValue({
                ...record,
                reveal: `${record.reveal}`,
              });
              setSpecData(record.specData);
            }, 100)
          }}>
            编辑
          </Button>
          <Button type="link" onClick={() => {
            let specsClone = JSON.parse(JSON.stringify(specs));
            specsClone.forEach((item, index) => {
              if (item.id === record.id) {
                specsClone.splice(index, 1);
              }
            })
            setSpecs(specsClone);
          }}>
            删除
          </Button>
        </div>
      ),
      align: 'center' as 'center',
    }
  ]

  return (
    <div className="add-spec-details">
      <Form.Item
        wrapperCol={{
          span: 18
        }}
      >
        {/* <Form form={form} component={false}> */}
        <Table
          rowKey="id"
          bordered
          // dataSource={specs[0]?.id ? specs : specs.map((item, index) => ({ ...item, id: index }))}
          dataSource={specs}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          footer={footer}
        />
        {/* </Form> */}
      </Form.Item>
      {/* 新增规格 */}
      <Modal
        className="add-spec-modal"
        title="新增规格"
        visible={addSpecModal}
        width={570}
        centered
        okText="确定"
        cancelText="取消"
        destroyOnClose
        onOk={async () => {
          const values = await form.validateFields();
          setSpecData(specDataTemp);
          setSpec({
            ...values,
            id: values.id || Date.now(),
            // reveal: revealEnum[values.reveal],
            specData: specDataTemp,
            value: specDataTemp.map((item) => (item.specVal)),
          });
          setAddSpecModal(false);
        }}
        onCancel={() => {
          setSpecDataTemp(specData);
          setAddSpecModal(false);
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            search: true,
            reveal: '1',
            sort: 100,
          }}
        // colon={false}
        >
          <Form.Item
            label="id"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规格名称"
            name="name"
            rules={[
              { required: true, message: '请填写规格名称' },
            ]}
          >
            <Input type="text" placeholder="请填写规格名称" className="input-height" />
          </Form.Item>
          <Form.Item
            label="展示形式"
            name="reveal"
            rules={[
              { required: true, message: '请选择展示形式' },
            ]}
          >
            <Radio.Group>
              <Radio value="1">文字</Radio>
              <Radio value="2">图片</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="规格值"
            name="spec"
            valuePropName="checked"
          >
            <Table
              rowKey="id"
              bordered
              dataSource={specDataTemp}
              columns={specColumns}
              rowClassName="editable-row"
              pagination={false}
              footer={specFooter}
            />
          </Form.Item>
          <Form.Item
            label="参与筛选"
            name="search"
            valuePropName="checked"
          >
            <Switch
            // checkedChildren="开启"
            // unCheckedChildren="关闭"
            />
          </Form.Item>
          <Form.Item
            label="排序"
            name="sort"
            rules={[
              { required: true, message: '请填写排序' },
            ]}
          >
            <InputNumber min={0} placeholder="请填写排序" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
});

export default AddSpecDetails;