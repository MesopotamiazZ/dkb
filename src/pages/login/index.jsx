import React, { memo, useState, useLayoutEffect, useEffect } from 'react'
import {
  Form, Input, Button,
  message, Spin, Carousel,
  Tabs,
  Checkbox
} from 'antd';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// import routers from '@/router'
import { loginApi } from '@/services/login'
import sha1 from '@/utils/sha1'
// import { actions } from '@/components/layout/store/slice'
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
  const history = useHistory();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false) //loading

  const [pageStatus, setPageStatus] = useState(PageStatus.LOGIN);

  const [validText, setValidText] = useState('获取验证码');

  const [form] = Form.useForm();

  // 登录后禁止跳转到登录页,跳转到登录后则清空所有数据
  useLayoutEffect(() => {
    if (localStorage.getItem("Dense-Diary-Authorization")) {
      history.replace('/overview')
    }
  }, [history])

  /**
   * 后台登录
   * @param {object} values 
   */
  const onFinish = async values => {
    setLoading(true);
    let res = await loginApi({
      account: values.account,
      password: sha1(values.password)
    })

    if (res.code === '0' || res.code === 0) {
      message.success('登录成功')
      setLoading(false);
      localStorage.setItem('Dense-Diary-Authorization', res.data.token)
      // res = await getsectionListApi();
      // let result = await getCurAccountInfo({});
      // if (result.code === 0 || result.code === '0') {
      //   localStorage.setItem('accountInfo', result.accountInfo)
      // }

      /**
       * 过滤菜单
       */
      // routers.forEach((item, index) => {
      //     if (item.path === '/orders') {
      //         routers[index].children = item.children.filter(cItem => {
      //             return res.data.some(dItem => dItem.section_id === cItem.section_id)
      //         })
      //     } else if (item.path === '/products') {
      //         routers[index].children = item.children.filter(cItem => {
      //             return res.data.some(dItem => dItem.section_id === cItem.section_id)
      //         })
      //     }
      // })
      // dispatch(actions.changeRoutersAction(routers))

      // 存储后端菜单
      // localStorage.setItem('sectionList',JSON.stringify(res.data))
      // localStorage.setItem('Dense-Diary-Router', JSON.stringify(routers))
      // console.log('筛选完', routers);

      history.push({ pathname: '/overview' })
    } else {
      message.warning(res.msg || '请求超时')
    }

  };

  /**
   * 点击发送手机验证
   */
  const onSendValidCode = () => {
    // setValidText('30s')
    timer = setInterval(() => {
      if (delayTime <= 1) {
        setValidText('获取验证码');
        delayTime = 30;
        clearInterval(timer);
        return
      }
      setValidText(`${--delayTime}秒后重试`);
    }, 1000);
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
      {...layout}
    >
      <Form.Item
        className="user-form-item"
        name="username"
      >
        <Input
          className="input-height"
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
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
        <Button className="form-button" type="primary" htmlType="submit">
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
      {...layout}
    >
      <Form.Item
        className="mobile-form-item"
        name="mobile"
      >
        <Input
          className="input-height"
          placeholder="手机号"
        />
      </Form.Item>
      <div className="valid-wrap">
        <Form.Item
          name="validCode"
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
        <Button className="form-button" type="primary" htmlType="submit">
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
        {...layout}
      >
        <Form.Item
          className="mobile-form-item"
          name="mobile"
        >
          <Input
            className="input-height"
            placeholder="手机号"
          />
        </Form.Item>
        <div className="valid-wrap">
          <Form.Item
            className="reset-valid-code"
            name="validCode"
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
          name="password"
        >
          <Input.Password
            className="input-height"
            type="password"
            placeholder="设置密码：6-16位字符，包含字母和数字"
          />
        </Form.Item>
        <div className="ant-row ant-form-item">
          <Button className="form-button" type="primary" htmlType="submit">
            登录
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
   * 立即注册
   */
  const registerForm = (
    <div className="register-form-wrap">
      <div className="wrap-title">立即注册</div>
      <Form
        className="login-form"
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item
          className="mobile-form-item"
          name="mobile"
        >
          <Input
            className="input-height"
            placeholder="手机号"
          />
        </Form.Item>
        <div className="valid-wrap">
          <Form.Item
            className="reset-valid-code"
            name="validCode"
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
        >
          <Input.Password
            className="input-height"
            type="password"
            placeholder="新密码：6-16位字符，包含字母和数字"
          />
        </Form.Item>
        <Form.Item valuePropName="checked">
          <Checkbox>
            我已阅读并同意
            <a href="" target="_blank">《档口宝服务协议》</a>
            <a href="" target="_blank">《个人信息保护政策》</a>
          </Checkbox>
        </Form.Item>
        <div className="ant-row ant-form-item">
          <Button className="form-button" type="primary" htmlType="submit">
            登录
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
              <Tabs defaultActiveKey="1" centered>
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
