import React, { memo, useState, useLayoutEffect, useEffect } from 'react'
import {
  Form, Input, Button,
  message, Spin, Carousel,
  Tabs,
  Checkbox
} from 'antd';
// import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import routers from '@/router'
import {
  loginApi,
  sendSms,
  registerApi,
  resetPassApi,
} from '@/services/login'
import { behaviorVerification, validatorPhone } from '@/utils'
// import sha1 from '@/utils/sha1'
import { actions } from './store/slice'
import ToogleLoginStyle from './components/toogle-login-style';
import './style.less';
import qrCode from '@/assets/images/qr-code.jpg';

export const PageStatus = {
  LOGIN: 1, // 密码/验证码登录
  WECHAT_LOGIN: 2, // 微信登录
  RESET: 3, // 重置
  RESIGER: 4, // 注册
}

const layout = {
  // labelCol: { span: 4 },
  wrapperCol: { span: 24 },
  labelAlign: 'left',
};

let delayTime = 30;
let timer = null;

export default memo(function () {
  const {
    getCurAccountInfoActionAsync
  } = actions;
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false) //loading

  const [pageStatus, setPageStatus] = useState(PageStatus.LOGIN);

  const [validText, setValidText] = useState('获取验证码');

  const [isPassLogin, setIsPassLogin] = useState(true); // 是否是密码登录或是验证码登录

  const [form] = Form.useForm();

  // 登录后禁止跳转到登录页,跳转到登录后则清空所有数据
  useLayoutEffect(() => {
    if (localStorage.getItem("Dense-Diary-Authorization")) {
      history.replace('/shop')
    }
  }, [history])

  /**
   * 后台登录/重置密码
   * @param {object} values 
   */
  const onFinish = async values => {
    try {
      let result;
      setLoading(true);
      switch (pageStatus) {
        case PageStatus.LOGIN: // 密码登录/验证码登录
          const res = await behaviorVerification();
          if (res.ret === 2) {
            setLoading(false);
            return
          }
          result = await loginApi({
            phone: values.phone,
            type: isPassLogin ? 1 : 2,
            password: values.password || '',
            smscode: values.smscode || '',
            ticket: res.ticket,
            randstr: res.randstr
          })
          if (result.code === 200) {
            message.success('登录成功');
            setLoading(false);
            localStorage.setItem('Dense-Diary-Authorization', result?.result?.token);
            dispatch(getCurAccountInfoActionAsync({ phone: parseInt(values.phone) }))
            history.push({
              pathname: '/shop'
            })
          } else {
            message.error('账号或密码错误');
          }
          break;
        case PageStatus.WECHAT_LOGIN: // 微信登录
          break;
        case PageStatus.RESET: // 重置密码
          result = await resetPassApi({
            phone: values.phone,
            newPassword: values.newPassword,
            smscode: values.smscode,
          });
          setLoading(false);
          if (result.code === 200) {
            message.success('重置成功');
            setPageStatus(PageStatus.LOGIN);
          } else {
            message.error(result.msg);
          }
          break;
        case PageStatus.RESIGER: // 注册
          result = await registerApi({
            phone: values.phone,
            password: values.password,
            smscode: values.smscode,
          })
          setLoading(false);
          if (result.code === 200) {
            message.success('注册成功');
            setPageStatus(PageStatus.LOGIN);
          } else {
            message.error(result.msg);
          }
          break;
        default: ;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 点击发送手机验证
   */
  const onSendValidCode = async () => {
    let node;
    const res = await behaviorVerification();
    console.log('行为验证', res);
    if (res.ret === 2) {
      setLoading(false);
      return
    }
    timer = setInterval(() => {
      if (delayTime <= 1) {
        setValidText('获取验证码');
        delayTime = 30;
        clearInterval(timer);
        return
      }
      setValidText(`${--delayTime}秒后重试`);
    }, 1000);
    switch (pageStatus) {
      case PageStatus.LOGIN: // 手机号登录
        node = 2;
        break;
      case PageStatus.RESIGER: // 注册
        node = 1;
        break;
      case PageStatus.RESET: //重置
        node = 3;
        break;
      default: ;
    }
    const result = await sendSms({
      phone: form.getFieldValue('phone'),
      node,
      ticket: res.ticket,
      randstr: res.randstr
    });
    if (result.code === 200) {
      message.success('验证码已发送，请注意查收');
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(timer);
    }
  }, [])

  /**
   * 密码登录
   */
  const passLoginForm = (
    <Form
      className="login-form"
      onFinish={onFinish}
      form={form}
      {...layout}
      initialValues={{
        phone: '',
        password: ''
      }}
    >
      <Form.Item
        className="user-form-item"
        name="phone"
        rules={[
          { required: true, message: '请填写手机号' },
          validatorPhone,
        ]}
      >
        <Input
          className="input-height"
          placeholder="手机号"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请填写密码' }]}
      >
        <Input.Password
          className="input-height"
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item className="remember-password" wrapperCol={{ span: 24 }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setPageStatus(PageStatus.RESET)}
        >
          忘记密码
        </span>
      </Form.Item>
      <div className="ant-row ant-form-item">
        <Button className="form-button" type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </div>
      <div className="login-and-register">
        还没账号？
        <Button
          type="link"
          onClick={() => setPageStatus(PageStatus.RESIGER)}
        >
          立即注册
        </Button>
      </div>
    </Form >
  )

  /**
   * 验证码登录
   */
  const validationLoginForm = (
    <Form
      className="login-form"
      onFinish={onFinish}
      form={form}
      {...layout}
    >
      <Form.Item
        className="mobile-form-item"
        name="phone"
        rules={[
          { required: true, message: '请填写手机号' },
          validatorPhone,
        ]}
      >
        <Input
          className="input-height"
          placeholder="手机号"
        />
      </Form.Item>
      <div className="valid-wrap">
        <Form.Item
          name="smscode"
          rules={[{ required: true, message: '请填写验证码' }]}
        >
          <Input
            className="input-height"
            placeholder="验证码"
          />
        </Form.Item>
        <Button
          className="send-valid-code"
          type="primary"
          ghost
          disabled={!!(validText !== '获取验证码')}
          onClick={onSendValidCode}
        >
          {validText}
        </Button>
      </div>
      <Form.Item className="remember-password" wrapperCol={{ span: 24 }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setPageStatus(PageStatus.RESET)}
        >
          忘记密码
        </span>
      </Form.Item>
      <div className="ant-row ant-form-item">
        <Button className="form-button" type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </div>
      <div className="login-and-register">
        还没账号？
        <Button
          type="link"
          onClick={() => setPageStatus(PageStatus.RESIGER)}
        >
          立即注册
        </Button>
      </div>
    </Form >
  )

  /**
   * 重置密码
   */
  const resetPassForm = (
    <div className="reset-form-wrap">
      <div className="wrap-title">重置密码</div>
      <Form
        className="login-form"
        onFinish={onFinish}
        form={form}
        {...layout}
      >
        <Form.Item
          className="mobile-form-item"
          name="phone"
          rules={[{ required: true, message: '请填写手机号' }, validatorPhone,]}
        >
          <Input
            className="input-height"
            placeholder="手机号"
          />
        </Form.Item>
        <div className="valid-wrap">
          <Form.Item
            className="reset-valid-code"
            name="smscode"
            rules={[{ required: true, message: '请填写验证码' }]}
          >
            <Input
              className="input-height"
              placeholder="验证码"
            />
          </Form.Item>
          <Button
            className="send-valid-code"
            type="primary"
            ghost
            disabled={!!(validText !== '获取验证码')}
            onClick={onSendValidCode}
          >
            {validText}
          </Button>
        </div>
        <Form.Item
          className="reset-new-password"
          name="newPassword"
          rules={[{ required: true, message: '请填写密码' }]}
        >
          <Input.Password
            className="input-height"
            type="password"
            placeholder="设置密码：6-16位字符，包含字母和数字"
          />
        </Form.Item>
        <div className="ant-row ant-form-item">
          <Button className="form-button" type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
        </div>
        <div className="login-and-register">
          已有账号？
          <Button
            type="link"
            onClick={() => setPageStatus(PageStatus.LOGIN)}
          >
            马上登录
          </Button>
        </div>
      </Form >
    </div>
  )

  /**
   * 免费注册
   */
  const registerForm = (
    <div className="register-form-wrap">
      <div className="wrap-title">免费注册</div>
      <Form
        className="login-form"
        onFinish={onFinish}
        form={form}
        {...layout}
        initialValues={{
          is_agree: true
        }}
      >
        <Form.Item
          className="mobile-form-item"
          name="phone"
          rules={[{ required: true, message: '请填写手机号' }, validatorPhone,]}
        >
          <Input
            className="input-height"
            placeholder="手机号"
          />
        </Form.Item>
        <div className="valid-wrap">
          <Form.Item
            className="reset-valid-code"
            name="smscode"
            rules={[{ required: true, message: '请填写验证码' }]}
          >
            <Input
              className="input-height"
              placeholder="验证码"
            />
          </Form.Item>
          <Button
            className="send-valid-code"
            type="primary"
            ghost
            disabled={!!(validText !== '获取验证码')}
            onClick={onSendValidCode}
          >
            {validText}
          </Button>
        </div>
        <Form.Item
          className=""
          name="password"
          rules={[{ required: true, message: '请填写密码' }]}
        >
          <Input.Password
            className="input-height"
            type="password"
            placeholder="新密码：6-16位字符，包含字母和数字"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="is_agree"
        // rules={[{ required: true, message: '请同意协议' }]}
        >
          <Checkbox>
            我已阅读并同意
            <a href="" target="_blank">《档口宝服务协议》</a>
            <a href="" target="_blank">《个人信息保护政策》</a>
          </Checkbox>
        </Form.Item>
        <div className="ant-row ant-form-item">
          <Button className="form-button" type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
        </div>
        <div className="login-and-register">
          已有账号？
          <Button
            type="link"
            onClick={() => setPageStatus(PageStatus.LOGIN)}
          >
            马上登录
          </Button>
        </div>
      </Form >
    </div>
  )

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-carousel-wrap">
          <Carousel className="slogen-box" autoplay>
          </Carousel>
        </div>
        <div className="login-form-wrap">
          <div className="login-form-wrap-inner">
            {
              (pageStatus === PageStatus.LOGIN
                || pageStatus === PageStatus.WECHAT_LOGIN)
              && <ToogleLoginStyle
                styles={pageStatus}
                onToogle={() => {
                  if (pageStatus === PageStatus.LOGIN) {
                    setPageStatus(PageStatus.WECHAT_LOGIN);
                  } else {
                    setPageStatus(PageStatus.LOGIN)
                  }
                }}
              />
            }
            {
              pageStatus === PageStatus.LOGIN
              &&
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={(key) => {
                  if (key === '1') {
                    setIsPassLogin(true);
                  } else {
                    setIsPassLogin(false);
                  }
                }}
              >
                <Tabs.TabPane tab="密码登录" key="1">
                  {
                    passLoginForm
                  }
                </Tabs.TabPane>
                <Tabs.TabPane tab="验证码登录" key="2">
                  {
                    validationLoginForm
                  }
                </Tabs.TabPane>
              </Tabs>
            }
            {
              pageStatus === PageStatus.WECHAT_LOGIN
              && <div className="wechat-login">
                <div className="wechat-login-title">微信登录</div>
                <div className="wechat-login-qr">
                  <img src={qrCode} alt="" />
                </div>
                <div className="wechat-login-tip">
                  使用微信扫描二维码登录“档口宝”
                </div>
                <div className="login-and-register">
                  还没账号？
                  <Button
                    type="link"
                    onClick={() => setPageStatus(PageStatus.RESIGER)}
                  >
                    立即注册
                  </Button>
                </div>
              </div>
            }
            {
              pageStatus === PageStatus.RESET && resetPassForm
            }
            {
              pageStatus === PageStatus.RESIGER && registerForm
            }
          </div>
        </div>
      </div>
    </div>
  )
})
