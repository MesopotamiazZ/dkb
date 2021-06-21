import React, { memo, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import {
  addSpecTemplate,
  updateSpecTemplate,
} from '@/services/product';
import { baseUrl } from '@/utils/upload';
import SelfForm from '@/components/add-form';
import './style.less';

const AddSpecTemplate = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const id = location?.state?.id;

  let {
    specTemplateDetail,
  } = useSelector(state => state['product-manage'], shallowEqual) //store数据

  const {
    getSpecTemplateDetailActionAsync,
    clearSpecTemplateDetail,
  } = actions;

  const [initValue, setInitValue] = useState({ status: true, is_system: true });
  const [defaultSpecDetails, setDefaultSpecDetails] = useState([]);
  const [specDetails, setSpecDetails] = useState();

  const initialData = () => {
    dispatch(getSpecTemplateDetailActionAsync({ id: id || localStorage.getItem('template_id') }));
  }

  /**
   * 初始化
   */
  useEffect(() => {
    if (id) {
      localStorage.setItem('template_id', id);
    }
    if (id || localStorage.getItem('template_id')) {
      initialData();
    }
    return () => {
      dispatch(clearSpecTemplateDetail({}));
      localStorage.removeItem('template_id');
    }
  }, [id])

  /**
   * 编辑赋值
   */
  useEffect(() => {
    if (Object.keys(specTemplateDetail).length) {
      setInitValue({
        is_system: specTemplateDetail.is_system,
        status: specTemplateDetail.status,
        name: specTemplateDetail.name,
        sort: specTemplateDetail.sort
      });
      setDefaultSpecDetails(specTemplateDetail.spec);
    }
  }, [specTemplateDetail])

  /**
   * 返回规格明细数据
   * @param {*} data 
   */
  const onGetDetails = (data) => {
    setSpecDetails(data.map((item) => ({
      name: item.name,
      reveal: item.reveal,
      value: item.value,
      search: item.search,
      sort: item.sort
    })));
  }

  const formProps = {
    initValue,
    formArr: [
      {
        title: '基本信息',
        search: [
          {
            wrap: {
              key: 'name',
              name: 'name',
              label: '模板名称',
              type: 'input',
              // help: '商品规格模板名称建议在60字以内。',
              rules: [
                { required: true, message: '请填写模板名称' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              placeholder: '请填写模板名称',
            }
          },
          {
            wrap: {
              key: 'sort',
              name: 'sort',
              label: '模板排序',
              type: 'inputnumber',
              // help: '请设为整数，且数值越小越靠前。',
              rules: [
                { required: true, message: '请填写模板排序' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              placeholder: '请填写模板排序',
              min: 0,
            }
          },
          {
            wrap: {
              key: 'status',
              name: 'status',
              label: '模板状态',
              type: 'switch',
              labelCol: {
                span: 2,
              },
              valuePropName: 'checked'
            },
            props: {
              checkedChildren: '开启',
              unCheckedChildren: '关闭'
            }
          },
          // {
          //   wrap: {
          //     key: 'is_system',
          //     name: 'is_system',
          //     label: '系统模板',
          //     type: 'switch',
          //     labelCol: {
          //       span: 2,
          //     },
          //     valuePropName: 'checked'
          //   },
          //   props: {
          //     checkedChildren: '开启',
          //     unCheckedChildren: '关闭'
          //   }
          // },
        ]
      },
      {
        title: '规格列表',
        search: [
          {
            wrap: {
              key: 'spec',
              name: 'spec',
              label: '模板规格',
              type: 'addspecdetails', // 与antd对应 
              labelCol: {
                span: 2,
              },
              wrapperCol: {
                span: 22
              }
            },
            props: {
              enum: defaultSpecDetails,
              onGetDetails,
            },
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
          if (id || localStorage.getItem('template_id')) {
            const res = await updateSpecTemplate({
              id: id || localStorage.getItem('template_id'),
              ...value,
              spec: specDetails
            })
            if (res.code === 200) {
              message.success('修改成功');
              localStorage.removeItem('template_id');
              history.push({
                pathname: '/product/product-manage/specTemplate'
              })
            } else {
              message.warning('修改失败');
            }
          } else {
            const res = await addSpecTemplate({
              ...value,
              spec: specDetails
            })
            if (res.code === 200) {
              message.success('新增成功');
              localStorage.removeItem('template_id');
              history.push({
                pathname: '/product/product-manage/specTemplate'
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
          localStorage.removeItem('template_id');
          history.push({
            pathname: '/setup/system/delivery'
          })
        }
      }
    ]
  }

  return (
    <div className="add-spec-template">
      <div className="add-spec-template-inner outer-area">
        <SelfForm
          formProps={formProps}
        />
      </div>
    </div>
  )
})

export default AddSpecTemplate;