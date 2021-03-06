import React, { useState, memo, useEffect } from 'react';
import {
  Table, Form, InputNumber, Button, Typography, Modal, Checkbox
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import './style.less';

const CheckboxGroup = Checkbox.Group;

const AddDeliveryArea = memo((props) => {
  const {
    // form,
    provinceList,
    defaultData,
    onSetDeliveryArea,
    type,
    selectAreas, // 已经选择的区域
  } = props;

  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deliveryModal, setDeliverAreaModal] = useState(false);
  const [provinceListTemp, setProvinceListTemp] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // const isEditing = (record) => record.id === editingKey;

  /**
   * 获取省份
   */
  useEffect(() => {
    setProvinceListTemp(provinceList.map((item) => ({
      label: item.name,
      value: item.name,
      disabled: editingKey ? false : selectAreas.indexOf(item.name) !== -1
    })))
    // setProvinceListTemp(provinceList.map((item) => (item.name)))
  }, [provinceList, selectAreas, editingKey])

  /**
   * 编辑默认可配区域
   */
  useEffect(() => {
    if (Object.keys(defaultData).length) {
      // console.log('defaultData', defaultData[0].area_name);
      setData(defaultData.map((item) => ({
        id: item.id,
        areas: item.area_name.join(','),
        first_unit: Number(item.frist_unit),
        first_money: Number(item.frist_money),
        next_unit: Number(item.next_unit),
        next_money: Number(item.next_money)
      })));
    }
  }, [defaultData])

  /**
   * 新增修改可配区域
   */
  useEffect(() => {
    const getAreaCode = (obj) => {
      // console.log('obj', obj?.areas)
      const code = [];
      if (obj?.areas instanceof Array) {
        obj?.areas?.forEach((item) => {
          provinceList.forEach((pro) => {
            if (item === pro.name) {
              code.push(pro.id)
            }
          })
        })
      }
      if (typeof obj?.areas === 'string') {
        obj?.areas?.split(',').forEach((item) => {
          provinceList.forEach((pro) => {
            if (item === pro.name) {
              code.push(pro.id)
            }
          })
        })
      }
      return {
        area_code: code
      }
    }
    onSetDeliveryArea(data.map((item) => {
      return ({
        ...item,
        area_name: item.areas,
        ...getAreaCode(item),
      })
    }));
  }, [data])

  /**
   * 修改
   * @param {*} record 
   */
  const edit = (record) => {
    // console.log(record)
    // form.setFieldsValue({
    //   areas: '',
    //   first_unit: '',
    //   first_money: '',
    //   next_unit: '',
    //   next_money: '',
    //   ...record,
    // });
    setCheckedList(record.areas.split(','));
    setEditingKey(record.id);
    setTimeout(() => {
      setDeliverAreaModal(true);
    }, 0)
  };

  /**
   * 删除
   * @param {*} record 
   */
  const del = (record, index) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.splice(index, 1)
    setData(newData);
  }

  // const cancel = () => {
  //   setEditingKey('');
  // };

  // const save = async (id) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...data];
  //     const index = newData.findIndex((item) => id === item.id);

  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, { ...item, ...row });
  //       setData(newData);
  //       setEditingKey('');
  //     } else {
  //       newData.push(row);
  //       setData(newData);
  //       setEditingKey('');
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };

  /**
   * 选择所有
   * @param {*} e 
   */
  const onCheckAllChange = e => {
    console.log(e, provinceListTemp.filter(item => (selectAreas.indexOf(item.name) === -1)).map(item => item.value))
    setCheckedList(e.target.checked ? provinceListTemp.filter(item => (selectAreas.indexOf(item.value) === -1)).map(item => item.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  /**
   * 选择某个
   * @param {*} list 
   */
  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < provinceListTemp.length);
    setCheckAll(list.length === provinceListTemp.length);
  };

  const footer = () => {
    return (
      <Button className="foot-btn" type="dashed" icon={<PlusOutlined />} onClick={() => setDeliverAreaModal(true)} >
        添加可配送区域和运费
      </Button >
    )
  }

  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType = 'number',
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {
  //   // console.log(editing,
  //   //   dataIndex,
  //   //   title,
  //   //   inputType = 'number',
  //   //   record,
  //   //   index,
  //   //   children);
  //   const inputNode = <InputNumber />;
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           style={{
  //             margin: 0,
  //           }}
  //           rules={[
  //             {
  //               required: true,
  //               message: `请输入${title}!`,
  //             },
  //           ]}
  //         >
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };

  const columns = [
    {
      title: '可配送区域',
      dataIndex: 'areas',
      width: '35%',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
      align: 'center',
      render: (_, record, index) => {
        // const editable = isEditing(record);
        return (
          <>
            <Typography.Link style={{ marginRight: 10 }} onClick={() => edit(record, index)}>
              修改
            </Typography.Link>
            <Typography.Link onClick={() => del(record, index)}>
              删除
            </Typography.Link>
          </>
        );
        // (
        //   <>
        //     <Typography.Link style={{ marginRight: 10 }} onClick={() => save(record.id)}>
        //       保存
        //     </Typography.Link>
        //     <Typography.Link onClick={() => cancel()}>
        //       取消
        //     </Typography.Link>
        //   </>
        // ) : 
      },
    },
    {
      title: type === '1' ? '首件(个)' : '首重(kg)',
      dataIndex: 'first_unit',
      // editable: true,
      align: 'center',
      render: (text, row, index) => (
        <InputNumber
          value={text}
          onChange={(val) => {
            // console.log(val)
            let dataClone = _.cloneDeep(data);
            dataClone[index]['first_unit'] = val;
            setData(dataClone);
          }}
        />
      ),
    },
    {
      title: '运费(元)',
      dataIndex: 'first_money',
      // editable: true,
      align: 'center',
      render: (text, row, index) => (
        <InputNumber
          value={text}
          onChange={(val) => {
            // console.log(val)
            let dataClone = _.cloneDeep(data);
            dataClone[index]['first_money'] = val;
            setData(dataClone);
          }}
        />
      ),
    },
    {
      title: type === '1' ? '续件(个)' : '续重(kg)',
      dataIndex: 'next_unit',
      // editable: true,
      align: 'center',
      render: (text, row, index) => (
        <InputNumber
          value={text}
          onChange={(val) => {
            // console.log(val)
            let dataClone = _.cloneDeep(data);
            dataClone[index]['next_unit'] = val;
            setData(dataClone);
          }}
        />
      ),
    },
    {
      title: '运费(元)',
      dataIndex: 'next_money',
      // editable: true,
      align: 'center',
      render: (text, row, index) => (
        <InputNumber
          value={text}
          onChange={(val) => {
            // console.log(val)
            let dataClone = _.cloneDeep(data);
            dataClone[index]['next_money'] = val;
            setData(dataClone);
          }}
        />
      ),
    },
  ];
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }

  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       inputType: col.dataIndex === 'age' ? 'number' : 'text',
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });

  return (
    <div className="add-delivery-area">
      <Form.Item>
        <Form form={form} component={false}>
          <Table
            // components={{
            //   body: {
            //     cell: EditableCell,
            //   },
            // }}
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
      {/* start 选择配送区域 */}
      <Modal
        className="select-delivery-modal"
        title="选择配送区域"
        visible={deliveryModal}
        width={620}
        centered
        okText="确定"
        cancelText="取消"
        destroyOnClose
        onOk={() => {
          // console.log(checkedList)
          if (!checkedList.length) {
            setDeliverAreaModal(false);
            return
          }
          if (editingKey) {
            const dataClone = _.cloneDeep(data);
            dataClone.forEach((item) => {
              if (item.id === editingKey) {
                item.areas = checkedList.join(',');
              }
            })
            setData(dataClone);
          } else {
            setData(data.concat({
              areas: checkedList.join(','),
              id: `${Date.now()}`,
              first_unit: 1,
              first_money: 0,
              next_unit: 0,
              next_money: 0
            }));
          }
          setCheckedList([]);
          setEditingKey('');
          setIndeterminate(false);
          setCheckAll(false);
          setDeliverAreaModal(false);
        }}
        onCancel={() => {
          setDeliverAreaModal(false);
          setCheckAll(false);
          setCheckedList([]);
          setEditingKey('');
        }}
      >
        <div>
          <Checkbox style={{ marginBottom: 12 }} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            选择所有
          </Checkbox>
        </div>
        <CheckboxGroup options={provinceListTemp} value={checkedList} onChange={onChange} />
      </Modal>
    </div>
  )
})

export default AddDeliveryArea;