import React, { memo, useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { addCustomerLevel, updateCustomerLevel } from '@/services/customer';
import { baseUrl } from '@/utils/upload';
import SelfForm from '@/components/add-form';
// import SelectColor from '@/components/select-color';
import './style.less';

const AddLevel = memo(() => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;

  let {
    customerLevelDetail,
  } = useSelector(state => state['customer-manage'], shallowEqual) //store数据

  const {
    getCustomerLevelDetailActionAsync,
    clearCustomerLevelDetail,
  } = actions;

  const [initValue, setInitValue] = useState({
    bgType: '1'
  })
  const [bgType, setBgType] = useState('1'); // 等级背景
  const [bgPic, setBgPic] = useState([]); // 背景图片
  // 背景色
  const [bgColor, setBgColor] = useState(''); // 背景颜色
  const [newBgColor, setNewBgColor] = useState(''); // 背景颜色修改
  // 成长值/成长规则
  const [upValue, setUpValue] = useState(''); // 成长值
  const [upRules, setUpRules] = useState([]); // 规则详情
  const [newUpValue, setNewUpValue] = useState('');
  const [newUpRules, setNewUpRules] = useState([]);

  // 权益
  const [benefitDefaultValues, setBenefitDefaultValues] = useState({ // 权益组件初始值
    freeShip: true, // 是否开启满金额包邮
    freeShipValue: '', // 包邮金额
    consumeDiscount: true, // 是否开启消费折扣
    discountType: '1', // 折扣类型
    unifiedDiscount: '', // 统一折扣
    segmentDiscount: [], // 分段折扣
  });
  const [newBenefitDefaultValues, setNewBenefitDefaultValues] = useState(null); // 权益组件修改值

  const initialData = () => {
    dispatch(getCustomerLevelDetailActionAsync({ id: id || localStorage.getItem('express_id') }));
  }

  /**
   * 初始化
   */
  useEffect(() => {
    if (id) {
      localStorage.setItem('level_id', id);
    }
    if (id || localStorage.getItem('level_id')) {
      initialData();
    }
    return () => {
      dispatch(clearCustomerLevelDetail({}));
    }
  }, [id])

  // 编辑赋值
  useEffect(() => {

  }, [])

  /**
   * 返回新的权益数据
   */
  const onGetBenefitHandle = (data) => {
    // console.log(data);
    setNewBenefitDefaultValues(data);
  }

  /**
   * 返回新的背景色
   */
  const onGetBgColorhandle = (color) => {
    setNewBgColor(color);
  }

  /**
   * 修改成长值/成长规则
   * @param {*} data 
   */
  const onChangeUpCondition = (data) => {
    setNewUpValue(data.upValue);
    setNewUpRules(data.dataSource.map((item, index) => ({
      status: item.status,
      count: index === 0
        ? Number(item.ruleDetail[0].value).toFixed(2)
        : item.ruleDetail[0].value,
      reward: item.ruleDetail[1].value,
    })))
  }

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
              label: '等级名称',
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
              placeholder: '请填写等级名称',
            }
          },
          {
            wrap: {
              key: 'bgType',
              name: 'bgType',
              label: '等级背景',
              type: 'radio', // 与antd对应 
              rules: [
                { required: true },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              // placeholder: '请填写等级名称',
              onChange: (e) => {
                setBgType(e.target.value);
              },
              enum: [
                {
                  value: '1',
                  label: '背景色'
                },
                {
                  value: '2',
                  label: '背景图'
                },
              ]
            }
          },
          {
            wrap: {
              key: '背景色',
              name: 'bgColor',
              label: ' ',
              type: 'selectcolor', // 与antd对应 
              // rules: [
              //   { required: true },
              // ],
              labelCol: {
                span: 2,
              },
              hidden: bgType !== '1'
            },
            props: {
              initColor: bgColor,
              onGetBgColor: onGetBgColorhandle,
            }
          },
          {
            wrap: {
              key: 'bgPic',
              name: 'bgPic',
              label: ' ',
              type: 'proupload', // 上传图片
              labelCol: {
                span: 2,
              },
              hidden: bgType !== '2'
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
              enum: bgPic,
              // [
              //   {
              //     path: "图片的路径，没有拼接域名",
              //     is_cover: 0 //是否为封面图
              //   }
              // ],
            }
          },
          {
            wrap: {
              key: 'upCondition',
              name: 'upCondition',
              label: '获取条件',
              type: 'upvalue',
              // rules: [
              //   { required: true },
              // ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              upVal: upValue,
              upRules: upRules,
              onChangeUpCondition,
            }
          },
        ]
      },
      {
        title: '权益礼包',
        search: [
          {
            wrap: {
              key: 'benefit',
              name: 'benefit',
              label: '权益',
              type: 'benefit',
              // rules: [
              //   { required: true },
              // ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              initValue: {
                ...benefitDefaultValues
              },
              onGetBenefit: onGetBenefitHandle,
            }
          }
        ],
      }
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
          if (id || localStorage.getItem('level_id')) {
            const res = await updateCustomerLevel({
              id: id || localStorage.getItem('level_id'),
              name: value.name,
              status: true,
              bgColor: newBgColor,
              bgPic: value.bgPic ? `${baseUrl}${value.bgPic[0]?.path}` : '',
              upValue: newUpValue,
              upRules: {
                payMoney: newUpRules[0],
                okPay: newUpRules[1]
              },
              benefit: {
                postAge: {
                  status: newBenefitDefaultValues.freeShip,
                  condition: newBenefitDefaultValues.freeShipValue,
                },
                discount: {
                  status: newBenefitDefaultValues.consumeDiscount,
                  disType: newBenefitDefaultValues.discountType,
                  condition: newBenefitDefaultValues?.discountType === '1'
                    ? Number(newBenefitDefaultValues.unifiedDiscount * 10).toFixed()
                    : newBenefitDefaultValues.segmentDiscount.map((item) => ({
                      meet: Number(item.meet).toFixed(2),
                      discount: Number(item.discount * 10).toFixed(),
                    }))
                }
              }
            });
          } else {
            const res = await addCustomerLevel({
              name: value.name,
              status: true,
              bgType,
              bgColor: newBgColor,
              bgPic: value.bgPic ? `${baseUrl}${value.bgPic[0]?.path}` : '',
              upValue: newUpValue,
              upRules: {
                payMoney: newUpRules[0],
                okPay: newUpRules[1]
              },
              benefit: {
                postAge: {
                  status: newBenefitDefaultValues.freeShip,
                  condition: newBenefitDefaultValues.freeShipValue,
                },
                discount: {
                  status: newBenefitDefaultValues.consumeDiscount,
                  disType: newBenefitDefaultValues.discountType,
                  condition: newBenefitDefaultValues?.discountType === '1'
                    ? Number(newBenefitDefaultValues.unifiedDiscount * 10).toFixed()
                    : newBenefitDefaultValues.segmentDiscount.map((item) => ({
                      meet: Number(item.meet).toFixed(2),
                      discount: Number(item.discount * 10).toFixed(),
                    }))
                }
              }
            });
            if (res.code === 200) {
              message.success('新建成功');
              history.push({
                pathname: '/customer/customer-manage/level'
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
            pathname: '/setup/system/delivery'
          })
        }
      }
    ]
  }

  return (
    <div className="add-level outer-area">
      <SelfForm
        formProps={formProps}
      />
    </div>
  )
})

export default AddLevel;