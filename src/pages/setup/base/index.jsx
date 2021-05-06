import React, { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import { getUploadToken } from '@/services/global';
import SelfForm from '@/components/add-form';
import './style.less';

const BaseSet = () => {
  const [uploadToken, setUploadToken] = useState(); // 文件上传token

  /**
   * 获取文件上传token
   * @param {*} obj 
   */
  const handleGetToken = async (obj) => {
    const result = await getUploadToken(obj);
    if (result) {
      setUploadToken(result);
    }
  };

  useEffect(() => {
    handleGetToken();
  }, [])

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

  const formProps = {
    // propTitle: "新增商品/修改商品",
    initValue: { "thirdparty_id": "11111" }, //初始值
    formArr: [
      {
        title: "基础信息", //每一块的标题
        search: [
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'merchant_name',
              name: 'merchant_name',
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

            }
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
              imageParams: {}, //阿里云的密钥 后端返回的
              //请求地址
              actionUrl: "https://luckycat-mini.oss-cn-chengdu.aliyuncs.com",
              //图片拼接的域名
              imgUrl: "https://luckycat-mini.oss-cn-chengdu.aliyuncs.com/",
              // 是否是只上传一张图片 1只上传一张 多张不传这个参数
              is_only: 1,
              //图片的文件路径
              fileUrl: "dense-diary-manager/banner/",
              //接受图片的类型
              accept: ".png", //默认值是.jpg
              // 初始列表
              // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
              enum: [],
              // {
              //   path: "图片的路径，没有拼接域名",
              //   is_cover: 0 //是否为封面图
              // }
            }
          },
          { // wrap 是放在form item上的属性
            wrap: {
              key: 'merchant_desc',
              name: 'merchant_desc',
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
              key: 'leader',
              name: 'leader',
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
              key: 'mobile',
              name: 'mobile',
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
              key: 'qq',
              name: 'qq',
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
              key: 'email',
              name: 'email',
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
          // { // wrap 是放在form item上的属性
          //   wrap: {
          //     key: 'email',
          //     name: obj.default,
          //     label: '邮箱账号',
          //     type: 'input', // 与antd对应 
          //     rules: [
          //       { required: true },
          //     ],
          //     labelCol: {
          //       span: 2,
          //     },
          //   },
          //   // 放在元素(input)上的属性
          //   props: {
          //     addonBefore: (
          //       <Select
          //         className="select-before"
          //         value={obj.default}
          //         onChange={(value) => {
          //           console.log(value)
          //           const objClone = JSON.parse(JSON.stringify(obj))
          //           objClone.default = value
          //           setObj(objClone)
          //         }}
          //       >
          //         {
          //           obj?.arr.map((o) => (
          //             <Select.Option key={o.key} value={o.value}>{o.value}</Select.Option>
          //           ))
          //         }
          //       </Select>
          //     ),
          //     placeholder: '请填写负责人邮箱账号',
          //   }
          // },
        ]
      },
    ],
    config: [{
      text: "保存",
      wrap: {
        type: "primary"
      },
      htype: "submit", // submit || reset
      onBtnClick: (value) => {
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
}

export default BaseSet;