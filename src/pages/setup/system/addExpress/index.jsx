import React, { memo, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addExpress, updateExpress } from '@/services/system';
import SelfForm from '@/components/add-form';
import './style.less';

const AddExpress = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;
  const selfRef = useRef(null);

  let {
    expressDetail,
    provinceList,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const {
    getExpressDetailActionAsync,
    getAreaActionAsync,
    clearExpressDetail,
  } = actions;

  const [initValue, setInitValue] = useState({
    type: '1',
    is_default: false,
    status: false,
  })
  const [defaultTemplate, setDefaultTemplate] = useState([]);
  const [template, setTemplate] = useState([]);

  const initialData = () => {
    dispatch(getExpressDetailActionAsync({ id: id || localStorage.getItem('express_id') }));
  }

  /**
   * 初始化
   */
  useEffect(() => {
    if (id) {
      localStorage.setItem('express_id', id);
    }
    if (id || localStorage.getItem('express_id')) {
      initialData();
    }
    return () => {
      dispatch(clearExpressDetail({}));
    }
  }, [id])

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(expressDetail).length) {
      setInitValue({
        is_default: expressDetail.is_default,
        status: expressDetail.status,
        name: expressDetail.name,
        type: `${expressDetail.type}`
      });
      setDefaultTemplate(expressDetail.template.map((item, index) => ({
        ...item,
        id: index + 1,
      })));
    }
  }, [expressDetail])

  /**
   * 获取区域
   */
  useEffect(() => {
    dispatch(getAreaActionAsync({ pid: 0, level: 1 }))
  }, [])

  const resizeListener = (e) => {
    console.log('resizeListener')
  }

  useEffect(() => {
    // const content = selfRef.current;
    // const formWrapper = content.querySelector('.form-wrapper');
    // console.log(formWrapper)
    window.addEventListener('resize', resizeListener, false)
    return () => {
      window.removeEventListener('resize', resizeListener, false)
    }
  }, [])

  /**
   * 可配送区域
   * @param {*} data 
   */
  const onSetDeliveryArea = (data) => {
    setTemplate(data.map(item => ({
      frist_unit: item?.first_unit,
      frist_money: item?.first_money?.toFixed(2),
      next_unit: item?.next_unit,
      next_money: item?.next_money?.toFixed(2),
      area_name: item?.area_name,
      area_code: item?.area_code,
    })))
  }

  // /**
  //  * 切换
  //  * @param {*} checked 
  //  */
  // const handleDefaultChange = (checked) => {
  //   const 
  // }

  // /**
  //  * 切换
  //  * @param {*} checked 
  //  */
  // const handleStatusChange = (checked) => {

  // }

  const formProps = {
    initValue,
    formArr: [
      {
        title: "基础信息", //每一块的标题
        search: [
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'name',
              name: 'name',
              label: '模板名称',
              type: 'input', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
            },
            // 放在元素(input)上的属性
            props: {
              placeholder: '模板名称最长20字',
            }
          },
          {
            wrap: {
              key: 'type',
              name: 'type',
              label: '计费类型',
              type: 'radio', // 与antd对应 
              labelCol: {
                span: 2,
              },
              rules: [
                { required: true },
              ],
            },
            props: {
              enum: [{ value: '1', label: "按件计费" }, { value: '2', label: "按重量计费" }] //radio 的选项值
            }
          },
          {
            wrap: {
              key: 'template',
              name: 'template',
              label: '可配送区域',
              type: 'adddeliveryarea',
              labelCol: {
                span: 2,
              },
              wrapperCol: {
                span: 18
              }
            },
            props: {
              provinceList,
              enum: defaultTemplate,
              onSetDeliveryArea,
            },
          },
        ]
      },
      {
        title: "模板状态", //每一块的标题
        search: [
          {
            wrap: {
              key: 'is_default',
              name: 'is_default',
              label: '设为默认',
              type: 'switch', // 与antd对应 
              labelCol: {
                span: 2,
              },
              valuePropName: 'checked'
            },
            props: {
              // onChange: handleDefaultChange,
              // checkedChildren: '开',
              // unCheckedChildren: '关'
            }
          },
          {
            wrap: {
              key: 'status',
              name: 'status',
              label: '模板状态',
              type: 'switch', // 与antd对应 
              labelCol: {
                span: 2,
              },
              valuePropName: 'checked'
            },
            props: {
              // onChange: handleStatusChange,
              // checkedChildren: '开',
              // unCheckedChildren: '关'
            }
          },
        ]
      },
    ],
    config: [
      {
        text: "保存",
        wrap: {
          type: "primary"
        },
        htype: "submit", // submit || reset
        onBtnClick: async (value) => {
          console.log("按钮点击的事件222", value);
          if (id || localStorage.getItem('express_id')) {
            const res = await updateExpress({
              id: id || localStorage.getItem('express_id'),
              ...value,
              template
            })
            if (res.code === 200) {
              message.success('修改成功');
              history.push({
                pathname: '/setup/system/delivery'
              })
            } else {
              message.warning('修改失败');
            }
          } else {
            const res = await addExpress({
              ...value,
              template
            })
            if (res.code === 200) {
              message.success('新增成功');
              history.push({
                pathname: '/setup/system/delivery'
              })
            } else {
              message.warning('新增失败');
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
            pathname: '/setup/system/delivery'
          })
        }
      }
    ]
  }

  return (
    <div className="add-express outer-area" ref={selfRef}>
      <SelfForm
        formProps={formProps}
      />
    </div>
  )
})

export default AddExpress;

