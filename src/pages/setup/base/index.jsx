import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from './store/slice';
import { updateBaseSet } from '@/services/setup';
import { baseUrl } from '@/utils/upload';
import SelfForm from '@/components/add-form';
import './style.less';

const BaseSet = memo(() => {
  const dispatch = useDispatch();

  // const [form] = Form.useForm();
  let {
    baseInfo,
    industry1,
    industry2
  } = useSelector(state => state.base, shallowEqual) //store数据

  const {
    getBaseSetActionAsync,
    getIndustryActionAsync,
    clearindustry2,
  } = actions;

  const [industrys, setIndustrys] = useState([]);
  const [initValue, setInitValue] = useState({});
  const [indSelects, setIndSelects] = useState([]);
  const [logoEnum, setLogoEnum] = useState([]);

  useEffect(() => {
    dispatch(getBaseSetActionAsync())
    dispatch(getIndustryActionAsync({ pid: 0 }))
  }, [])

  useEffect(() => {
    if (Object.keys(baseInfo).length) {
      console.log('baseInfo', baseInfo)
      setInitValue({ ...baseInfo });
      setIndSelects(baseInfo?.industry.split(','));
      setLogoEnum([
        {
          path: baseInfo?.logo,
          is_cover: 0 //是否为封面图
        }
      ])
    }
  }, [baseInfo])

  // const [obj, setObj] = useState({
  //   default: 'http',
  //   arr: [
  //     {
  //       key: 'http',
  //       name: 'http',
  //       value: 'http',
  //     },
  //     {
  //       key: 'https',
  //       name: 'https',
  //       value: 'https',
  //     },
  //   ]
  // });

  // const renderAddonBefore = useCallback(() => {
  //   return (
  //     <Select defaultValue="http" className="select-before" onChange={(value) => {
  //       console.log(value);
  //       const objClone = JSON.parse(JSON.stringify(obj))
  //       objClone?.arr.forEach((item) => {
  //         if (item.value === value) {
  //           objClone.default = value
  //         }
  //       })
  //       setObj(objClone)
  //     }}>
  //       {
  //         obj?.arr.map((o) => (
  //           <Select.Option key={o.key} value={o.value}>{o.value}</Select.Option>
  //         ))
  //       }
  //     </Select>
  //   )
  // }, [obj])

  /**
   * 选择行业
   * @param {*} param0 
   */
  const handleSelectIndustry = ({ value, index }) => {
    if (index === 1) {
      setIndustrys([value]);
      dispatch(clearindustry2([]));
      dispatch(getIndustryActionAsync({ pid: parseInt(value) }));
    } else {
      setIndustrys([...industrys, value]);
    }
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
              label: '商户名称',
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
              key: 'industry',
              name: 'industry',
              label: '商户行业',
              type: 'proselects',
              style: {
                marginBottom: 0
              },
              required: true,
              labelCol: {
                span: 2,
              },
            },
            props: {
              baseIndustryList: industry1,
              thinIndustryList: industry2,
              handleSelectIndustry,
              selects: indSelects,
            },
          },
          {
            wrap: {
              key: 'logo',
              name: 'logo',
              label: '商户LOGO',
              type: 'proupload', // 上传图片
              labelCol: {
                span: 2,
              },
            },
            props: {
              //请求的参数
              imageParams: {

              },
              //请求地址
              actionUrl: baseUrl,
              //图片拼接的域名
              imgUrl: baseUrl,
              // 是否是只上传一张图片 1只上传一张 多张不传这个参数
              is_only: 1,
              //图片的文件路径
              // fileUrl: `${beforeKey}merchant-logo`,
              //接受图片的类型
              accept: ".png,.jpg,.jpeg,.svg", //默认值是.jpg
              // 初始列表
              // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
              enum: logoEnum,
              // [
              //   {
              //     path: "图片的路径，没有拼接域名",
              //     is_cover: 0 //是否为封面图
              //   }
              // ],
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'description',
              name: 'description',
              label: '商户简介',
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
              placeholder: '建议36个字符（一般不超过100个字符）',
            }
          },
        ]
      },
      {
        title: "负责人信息", //每一块的标题
        search: [
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_name',
              name: 'su_name',
              label: '负责人',
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
              placeholder: '请填写负责人名字',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_tel',
              name: 'su_tel',
              label: '电话号码',
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
              placeholder: '请填写负责人电话号码',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_qq',
              name: 'su_qq',
              label: 'QQ号码',
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
              placeholder: '请填写负责人QQ号码',
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'su_email',
              name: 'su_email',
              label: '邮箱账号',
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
              placeholder: '请填写负责人邮箱账号',
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
      onBtnClick: async (value) => {
        console.log("按钮点击的事件222", value);
        const res = await updateBaseSet({
          ...value,
          industry: [value.baseIndustry, value.thinIndustry].join(','),
          logo: (typeof value.logo === 'string') ? value.logo : baseUrl + value.logo[0].path,
        })
        if (res.code === 200) {
          message.success('修改成功');
          dispatch(getBaseSetActionAsync());
        } else {
          message.warning('修改失败');
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
    <div className="base-set">
      <div className="base-set-inner outer-area">
        <SelfForm
          formProps={formProps}
        />
      </div>
    </div >
  )
})

export default BaseSet;