import { memo, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Layout, Menu } from 'antd';
import {
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    UserOutlined,
    // VideoCameraOutlined,
    // UploadOutlined,
} from '@ant-design/icons';

import Header from './layout-header'
import FirstSider from './firstSider'

import routersAll from '@/router'
import { actions } from './store/slice'
import { useCreateRoutes } from '@/utils/utils'
import './index.less'

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default memo(() => {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    let { routers } = useSelector(state => state.layout, shallowEqual) //store数据
    console.log("routers", routers)
    const [collapsed, setCollapsed] = useState(false) //菜单开关
    const [currentPath, setCurrentPath] = useState('') //当前路由

    // const routers = useRef();

    /**
     * 菜单显示隐藏
     */
    const toggle = () => setCollapsed(!collapsed)

    /**
     * 页面跳转
     * @param {String} path 
     */
    const goto = path => {
        history.push(path)
        setCurrentPath(path)
    }

    /**
     * 重定向
     * @param {*} path 
     */
    const redirectTo = path => {
        history.redirectTo(path)
        setCurrentPath(path)
    }

    return (
        <div className="layout-wrap">
            {/* <Sider className="first-nav" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" ></div>
                {createMenu(routers, goto, location, currentPath)}
            </Sider>
            <Sider className="second-nav" trigger={null} collapsed={true}>
                二级导航
            </Sider> */}
            <FirstSider
                accountInfo={{}}
                routes={routers}
                goto={goto}
                redirectTo={redirectTo}
                currentPath={currentPath}
            />
            <Layout className="site-layout">
                <Header routers={routers} pathname={currentPath}>

                </Header>
                <Content
                    className="layout-conent site-layout-background"
                // style={{ margin: '24px 16px 16px 16px' }}
                >
                    {useCreateRoutes(routers)}
                </Content>
            </Layout>
        </div >
    );

})

/**
 * 创建菜单
 * @param {Array} routes 路由配置表
 * @param {Function} goto 页面跳转
 * @param {Object} location 
 * @param {String} currentPath 当前路由
 */
const createMenu = (routes, goto, location, currentPath) => {
    console.log('------------------routes:', routes, 'routersAll:', routersAll, 'goto:', goto, 'llocation:', location, 'currentPath:', currentPath)
    const parent = routersAll.find(item => item.children?.some(cItem => cItem.path === location.pathname))
    // console.log('parent', parent)
    // 菜单默认选中为当前路由
    return (<Menu theme="dark" mode="vertical" multiple={true} defaultOpenKeys={[parent?.path]} selectedKeys={[currentPath || location.pathname]}>
        {
            routes.map(mItem => {
                // console.log('mItem.children', mItem.children)
                if (mItem.children && !mItem.componentPath) {
                    return (
                        <SubMenu key={mItem.path} title={mItem.title} icon={<UserOutlined />} >
                            {
                                mItem.children.map(item => {
                                    if (item.children && item.children.length && !item.componentPath && !item.hidden) {
                                        return (
                                            <SubMenu key={item.path} title={item.title} icon={<UserOutlined />}>
                                                {
                                                    item.children.map(it => !it.hidden && (
                                                        <Menu.Item
                                                            key={it.path}
                                                            icon={<UserOutlined />}
                                                            onClick={() => goto(it.path)}>
                                                            {it.title}
                                                        </Menu.Item>
                                                    ))
                                                }
                                            </SubMenu>
                                        )
                                    }
                                    return (
                                        !item.hidden
                                        && (
                                            <Menu.Item
                                                key={item.path}
                                                icon={<UserOutlined />}
                                                onClick={() => goto(item.path)}>
                                                {item.title}
                                            </Menu.Item>
                                        )
                                    )
                                }
                                )
                            }
                        </SubMenu>
                    )
                } else {
                    return !mItem.hidden ? <Menu.Item key={mItem.path} icon={<UserOutlined />} onClick={() => goto(mItem.path)}>{mItem.title}</Menu.Item> : null
                }
            })
        }
    </Menu>)
}

