import React, { memo, useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import {
  addRole,
  updateRole
} from '@/services/permissions';
import SelfForm from '@/components/add-form';
import './style.less';

const AddRole = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;

  const {
    getRoleAuthActionAsync,
    getRoleDetailActionAsync,
    clearRoleDetail,
  } = actions;

  let {
    roleAuthList,
    roleDetail,
  } = useSelector(state => state.permissions, shallowEqual) //store数据

  const [initValue, setInitValue] = useState([]);
  const [checkedList, setCheckedList] = useState([]); // 存放edit数据
  const [checkedList1, setCheckedList1] = useState([]); // 存放add数据

  const initialData = () => {
    // 获取role详情
    dispatch(getRoleDetailActionAsync({ id: id || localStorage.getItem('role_id') }));
  }

  useEffect(() => {
    dispatch(getRoleAuthActionAsync());
  }, [])

  /**
   * 初始化
   */
  useEffect(() => {
    if (id) {
      localStorage.setItem('role_id', id);
    }
    if (id || localStorage.getItem('role_id')) {
      initialData();
    }
    return () => {
      dispatch(clearRoleDetail({}))
    }
  }, [id])

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(roleDetail).length) {
      setInitValue({
        name: roleDetail?.name,
        description: roleDetail?.description,
      })
      setCheckedList(roleDetail?.auths?.split(',').map((item) => (parseInt(item))));
    }
  }, [roleDetail])

  /**
   * 格式化tree数据
   * @param {*} treeData 
   */
  const parseTreeData = (treeData) => {
    return treeData?.map((data) => ({
      ...data,
      children: parseTreeData(data.child),
      title: data.name,
      key: data.id,
    }))
  }

  /**
   * add时选中
   * @param {*} list 
   */
  const onChecked = (list) => {
    setCheckedList1(list);
  }

  const formProps = {
    // propTitle: "新增商品/修改商品",
    // form,
    initValue, //初始值
    formArr: [
      {
        title: "基础信息", //每一块的标题
        search: [
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'name',
              name: 'name',
              label: '角色名称',
              type: 'input', // 与antd对应 
              rules: [
                { required: true, message: '请填写角色名称' },
              ],
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '请填写角色名称',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'description',
              name: 'description',
              label: '角色描述',
              type: 'textarea', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
              className: 'input-textarea'
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '请填写角色描述',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'auths',
              name: 'auths',
              label: '设置权限',
              type: 'checktree', // 与antd对应 
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              treeData: parseTreeData(roleAuthList),
              checkedList: checkedList,
              expandList: roleAuthList.filter((list) => {
                return list.child.length
              }).map((list) => (list.id)),
              onChecked,
            }
          },
        ]
      },
    ],
    config: [{
      text: "保存",
      wrap: {
        type: "primary"
      },
      htype: "submit", // submit || reset
      onBtnClick: async (values) => {
        console.log("按钮点击的事件222", values);
        if (id || localStorage.getItem('role_id')) {
          const res = await updateRole({
            id: id || localStorage.getItem('role_id'),
            ...values,
            auths: checkedList1.join(',')
          })
          if (res.code === 200) {
            message.success('更新成功');
            history.push({
              pathname: '/setup/permissions/staffRole'
            })
          } else {
            message.warning('更新失败');
          }
        } else {
          const res = await addRole({
            ...values,
            auths: checkedList1.join(',')
          })
          if (res.code === 200) {
            message.success('新建成功');
            history.push({
              pathname: '/setup/permissions/staffRole'
            })
          } else {
            message.warning('新建失败');
          }
        }
      }
    },
    {
      text: "取消",
      wrap: {
        //按钮的一些属性配置
      },
      htype: "", // submit || reset
      onBtnClick: (value) => {
        //value 返回的是表单的数据
        // type=submit 按钮有提交功能 会自动数据验证
        // type=reset  重置表单
        // 其余的不用传type值
        console.log("按钮点击的事件111", value);
        history.push({
          pathname: '/setup/permissions/staffRole'
        })
      }
    }],
    // form的属性配置
    // layoutConfig: {
    //   // layout: 'block',
    //   wrapperCol: {
    //     lg: 8
    //   }
    // }
  }

  return (
    <div className="add-role">
      <div className="add-role-inner outer-area">
        <SelfForm
          formProps={formProps}
        />
      </div>
    </div>
  )
})

export default AddRole;