import React, { memo, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Switch,
  Cascader,
  TreeSelect,
  Input,
  message
} from 'antd';
// import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addCategory, updateCategory } from '@/services/product';
import moment from 'moment';
import ProUpload from '@/components/pro-upload';
import DkbTable from '@/components/dkb-table';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import { baseUrl } from '@/utils/upload';

import './style.less';

const Classification = memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    getCategoryTreeActionAsync,
    getCategoryDetailActionAsync,
    clearCategoryDetail,
  } = actions;

  let {
    categoryTrees,
    categoryDetail,
  } = useSelector(state => state['product-manage'], shallowEqual) //store数据

  const [refresh, setRefresh] = useState(false);
  const [createCateModal, setCreateCateModal] = useState(false);
  const [curId, setCurId] = useState('');

  const initialData = () => {
    dispatch(getCategoryTreeActionAsync({ pid: 0 })); // 获取商品分类树结构
  }

  /**
   * 初始化
   */
  useEffect(() => {
    initialData();
  }, [])

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(categoryDetail).length) {
      form.setFieldsValue({
        name: categoryDetail?.name,
        status: categoryDetail?.status,
        pid: categoryDetail?.pid
      })
    }
  }, [categoryDetail])

  /**
   * 新建/编辑分类
   */
  const addAndEditCate = async () => {
    const values = await form.validateFields();
    if (!curId) {
      console.log(values)
      const res = await addCategory({
        ...values,
        img: baseUrl + values?.img[0]?.path,
      });
      if (res.code === 200) {
        message.success('新建成功');
        setRefresh(!refresh);
        setCreateCateModal(false);
        dispatch(getCategoryTreeActionAsync({ pid: 0 }));
        dispatch(clearCategoryDetail({}));
      } else {
        message.warning('新建失败');
      }
    } else {
      const res = await updateCategory({
        id: curId,
        ...values,
        img: values?.img[0]?.path.indexOf('http') === -1
          ? baseUrl + values?.img[0]?.path
          : values?.img[0]?.path,
      })
      if (res.code === 200) {
        message.success('更新成功');
        setRefresh(!refresh);
        setCreateCateModal(false);
        dispatch(getCategoryTreeActionAsync());
        dispatch(clearCategoryDetail({}));
      } else {
        message.warning('更新失败');
      }
    }
  }

  /**
   * 选择上级分类
   */
  const handleOnSettleChange = () => {

  }

  /**
   * 格式化树形分类
   * @param {*} categoryTrees 
   */
  const parseTree = (categoryTrees, isChild) => {
    // const options = categoryTrees?.map((item) => ({
    //   ...item,
    //   value: item.id,
    //   label: item.name,
    //   children: parseTree(item.child, true)
    // }))
    // if (!isChild) {
    //   options.unshift({
    //     value: 0,
    //     label: '顶级分类'
    //   });
    // }
    const options = categoryTrees?.map((item) => (
      <TreeSelect.TreeNode value={item.id} title={item.name}>
        {
          parseTree(item.child)
        }
      </TreeSelect.TreeNode>
    ))
    return options;
  }

  const tools = {
    btns: [
      {
        text: '新建分类',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          setCurId('');
          setCreateCateModal(true);
          setTimeout(() => {
            form.resetFields();
          }, 100);
        }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: () => { },
    placeholder: '请输入分类名称',
    searchBtnText: '搜索',
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => {
          dispatch(getCategoryDetailActionAsync({ id: record.id }));
          setCurId(record.id);
          setCreateCateModal(true);
        },
      },
      {
        key: '2',
        text: '删除',
        type: 'link',
        onActionClick: () => { },
      }
    ]
  }

  const columns = [
    {
      title: '分类名称',
      // dataIndex: 'name',
      render: (record) => (
        <div>
          {record.name}
          <span className="sub-color">({record.child_count})</span>
        </div>
      ),
      width: '50%',
      align: 'left',
    },
    {
      title: '商品数',
      dataIndex: 'goods_count',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          type="circle"
          badge_status={(record.status === 1 || record.status) ? 'success' : 'default'}
          badge_text={(record.status === 1 || record.status) ? '开启' : '关闭'}
        />
      ),
      align: 'center',
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
    <div className="product-classification outer-area">
      <div className="product-classification-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url="/Goods/MdseClass/getList"
          row
          requestData={{ pid: 0 }}
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      {/* 新建分类 */}
      <Modal
        className="create-cate-modal"
        title={!curId ? '新建分类' : '更新分类'}
        visible={createCateModal}
        destroyOnClose
        width={570}
        okText="确定"
        cancelText="取消"
        onOk={() => addAndEditCate()}
        onCancel={() => {
          setCreateCateModal(false);
          dispatch(clearCategoryDetail({}));
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            status: true
          }}
        // colon={false}
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[
              { required: true, message: '请填写分类名称' },
            ]}
          >
            <Input type="text" placeholder="请填写分类名称" className="input-height" />
          </Form.Item>
          <Form.Item
            label="上级分类"
            name="pid"
            rules={[
              { required: true, message: '请选择上级分类' },
            ]}
          >
            {/* <Cascader
              options={
                parseTree(categoryTrees)
              }
              // onChange={handleOnSettleChange}
              changeOnSelect
              placeholder="请选择上级分类"
            /> */}
            <TreeSelect
              // showSearch
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择上级分类"
              allowClear
              treeDefaultExpandAll
            >
              <TreeSelect.TreeNode value={0} title="顶级分类">
                {
                  parseTree(categoryTrees)
                }
              </TreeSelect.TreeNode>
            </TreeSelect>
          </Form.Item>
          <Form.Item
            key="img"
            label="分类图标"
            name="img"
            style={{ marginBottom: 0 }}
          >
            <ProUpload
              imageParams={{}}
              actionUrl={baseUrl}
              imgUrl={baseUrl}
              is_only={1}
              accept='.png,.jpg,.jpeg,.svg'
              defaultList={curId ? [{ path: categoryDetail?.img, is_cover: 0 }] : []}
              onChange={(pics) => {
                console.log(baseUrl + pics[0]?.path);
              }}
            />
          </Form.Item>
          <Form.Item
            // labelCol={{ span: 4 }}
            wrapperCol={{ span: 18, offset: 4 }}
          // style={{ marginBottom: 0 }}
          >
            <span className="sub-color">用于分类显示，建议尺寸：200px*200px。</span>
          </Form.Item>
          <Form.Item
            label="等级状态"
            name="status"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
            />
          </Form.Item>
          <Form.Item
            // labelCol={{ span: 4 }}
            wrapperCol={{ span: 18, offset: 4 }}
          // style={{ marginBottom: 0 }}
          >
            <span className="sub-color">等级状态关闭时将不对外展示</span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})

export default Classification;