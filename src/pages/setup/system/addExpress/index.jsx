import React, { memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import SelfForm from '@/components/add-form';
import './style.less';

const AddExpress = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;

  let {
    expressDetail,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const {
    getExpressDetailActionAsync,
  } = actions;

  const initialData = () => {
    dispatch(getExpressDetailActionAsync());
  }

  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id);
      initialData();
    }
  }, [id])

  const formProps = {
    initValue: {
      type: '1'
    },
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
              placeholder: '商户名称最长20字',
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
              key: 'twelve',
              name: 'twelve',
              label: 'proformlist',
              type: 'proformlist', // 类似表格的form 比如添加规格
              labelCol: {
                span: 2,
              },
              wrapperCol: {
                span: 18,
              }
            },
            props: {
              filedName: "twelve", // 这个是最终获取数据的key值
              // 设置表格的 name:是数据的key  title:表格的标题 rules是input的规则
              filedTitle: [{ name: "one", title: "标题11", rules: [{ required: true, message: 'one1' }] },
              { name: "two", title: "标题2", rules: [{ required: true, message: 'one2' }] },
              { name: "there", title: "标题3", rules: [{ required: true, message: 'one3' }] },
              ]
              // 通过 initValue 设置初始值
              // 赋初始值的格式
              // const arr=[{one: "1", two: "1", there: "1"},{one: "2", two: "2", there: "2"}];
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
        }
      }
    ]
  }

  return (
    <div className="add-express">
      <SelfForm
        formProps={formProps}
      />
    </div>
  )
})

export default AddExpress;

