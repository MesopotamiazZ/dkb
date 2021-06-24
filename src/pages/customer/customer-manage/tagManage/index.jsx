/**
 * @author tigris
 * @description 标签管理里列表页
 */
import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Select, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addCustomerTag, updateCustomerTag, removeCustomerTag } from '@/services/customer';
import DkbTable from '@/components/dkb-table';
import RenderAction from '@/components/renderAction';
import DelTipModal from '@/components/delete-tip-modal';


import './style.less';

const TagManage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    clearTagDetail,
    getTagDetailActionAsync,
  } = actions;

  let {
    tagDetail,
  } = useSelector(state => state['customer-manage'], shallowEqual) //store数据

  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [curId, setCurId] = useState('');
  const [createTagModal, setCreateTagModal] = useState(false);
  const [delTipModal, setDelTipModal] = useState(false);
  const [curRecord, setCurRecord] = useState(null);

  useEffect(() => {
    if (Object.keys(tagDetail).length) {
      form.setFieldsValue({
        name: tagDetail?.name,
        type: `${tagDetail?.type}`,
        description: tagDetail?.description,
      })
    }
  }, [tagDetail])

  /**
   * 新增编辑标签
   */
  const addAndEditTag = async () => {
    const values = await form.validateFields();
    if (!curId) {
      const res = await addCustomerTag({
        ...values,
      });
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateTagModal(false);
        dispatch(clearTagDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateCustomerTag({
        id: curId,
        ...values,
      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateTagModal(false);
      } else {
        message.warning('更新失败');
      }
    }
  }

  const tools = {
    btns: [
      {
        text: '新建标签',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateTagModal(true);
          setTimeout(() => {
            form.resetFields()
          }, 100);
        }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true,
        },
        onClick: () => { }
      },
    ],
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '请输入标签名称',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      onClick: () => { }
    }
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          dispatch(getTagDetailActionAsync({ id: record.id }));
          setCurId(record.id);
          setCreateTagModal(true);
        },
      },
      {
        key: '2',
        text: '删除',
        type: 'link',
        title: '标签',
        onActionClick: async () => {
          const res = await removeCustomerTag({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
          // setCurRecord(record);
          // setTimeout(() => {
          //   setDelTipModal(true);
          // }, 0)
        },
      },
    ]
  }

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      width: '30%',
      align: 'left',
    },
    {
      title: '标签人数',
      dataIndex: 'count',
      align: 'left',
    },
    {
      title: '标签类型',
      dataIndex: 'type',
      align: 'left',
    },
    {
      title: '操作',
      render: (record) => (
        <RenderAction
          record={record}
          type="row"
          getBtns={() => getBtns(record)}
        />
      ),
      align: 'center',
      fixed: 'right'
    }
  ]

  return (
    <div className="tag-manage outer-area">
      <div className="tag-manage-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Scrm/CsrTag/getList'
              : '/Scrm/CsrTag/getList/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      {/* 新建标签 */}
      <Modal
        className="create-tag-modal"
        title={!curId ? '新建标签' : '更新标签'}
        visible={createTagModal}
        destroyOnClose
        width={620}
        okText={!curId ? '新建标签' : '更新标签'}
        cancelText="取消"
        onOk={() => addAndEditTag()}
        onCancel={() => {
          setCreateTagModal(false);
          dispatch(clearTagDetail({}));
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
          }}
        // colon={false}
        >
          <Form.Item
            label="标签名称"
            name="name"
            rules={[
              { required: true, message: '请填写标签名称' },
            ]}
          >
            <Input type="text" placeholder="请填写标签名称" className="input-height" />
          </Form.Item>
          <Form.Item
            label="标签类型"
            name="type"
            rules={[
              { required: true, message: '请填写标签名称' },
            ]}
          >
            <Select placeholder="请选择标签类型">
              <Select.Option value="1" key="1">
                手动标签
              </Select.Option>
              <Select.Option value="2" key="2" disabled>
                自动标签
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="标签备注"
            name="description"
            rules={[
              { required: true, message: '请填写标签备注' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* 确认删除 */}
      <DelTipModal
        title="删除标签"
        width={282}
        text={`确认删除【${curRecord?.name}】标签？`}
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await removeCustomerTag({ id: curRecord.id });
          if (res.code === 200) {
            message.success('删除成功');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('删除失败');
          }
        }}
      />
    </div>
  )
}

export default TagManage;