import React, { memo, useState, useLayoutEffect } from 'react'
import { Form, Input, Button, message, Spin, } from 'antd';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// import routers from '@/router'
import { loginApi } from '@/services/login'
import sha1 from '@/utils/sha1'
// import { actions } from '@/components/layout/store/slice'
import './style.less';


export default memo(function () {
  const history = useHistory();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false) //loading

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

  // const menu = (
  //     <Menu onClick={handleLangChange} style={{ width: 150 }} selectedKeys={[lang]}>
  //         <Menu.Item key="en_US">us English</Menu.Item>
  //         <Menu.Item key="zh_CN">cn 简体中文</Menu.Item>
  //     </Menu>
  // );

  return (
    <div className="login-wrap">
      <header>
        {/* <Dropdown overlay={menu}>
                    <TranslationOutlined style={{ fontSize: 18, marginBottom: 10 }} />
                </Dropdown> */}
      </header>
      <div className="login-box">
        <h2 style={{ textAlign: 'center' }}>档口宝后台</h2>
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="account"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ height: 40 }}
              size="middle"
              placeholder={'用户名'} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input style={{ height: 40 }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={'密码'}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>

            <Button
              type="primary"
              htmlType="submit"
              onClick={() => { }}
              className="login-form-button"
              loading={loading}
            >
              登录
            </Button>


          </Form.Item>

        </Form>

      </div>
      {
        loading && <Spin className="loading" size="large" />
      }

    </div>
  )
})
