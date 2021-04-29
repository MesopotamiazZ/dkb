import { memo, useEffect, useState } from 'react'
import { Breadcrumb, Space, Avatar, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom'
// import { SearchOutlined, BellOutlined, GithubOutlined, PoweroffOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less'
import vip from '@/assets/images/vip.png';
import home from '@/assets/images/home.svg';
import help from '@/assets/images/help.svg';
import arrowBottom from '@/assets/images/arrow-triangle.svg';



export default memo(function ({ routers, pathname, toggle }) {

    const history = useHistory();
    const [breadcrumb, setBreadcrumb] = useState();
    const [accountInfo, setAccountInfo] = useState(null);

    useEffect(() => {
        const tag = renderTag(routers, pathname);
        setBreadcrumb(tag);
        setAccountInfo(JSON.parse(localStorage.getItem('accountInfo')));
    }, [pathname])

    /**
     * 退出登录
     */
    const logOut = () => {
        localStorage.removeItem('Dense-Diary-Authorization');
        history.push('/login')
    }

    const menu = (
        <Menu className="dorp-down-menu">
            <Menu.Item>
                <div
                    onClick={() => logOut()}
                >
                    注销登录
                </div>
            </Menu.Item>
        </Menu>
    )


    return (
        <header className="layout-header-wrap bg-white flex space-between align-center">
            <div className="flex align-center">
                <Space>
                    {/* <MenuUnfoldOutlined onClick={toggle} /> */}
                    <Breadcrumb>
                        {
                            breadcrumb
                            && breadcrumb.map(item => {
                                return (
                                    <Breadcrumb.Item key={item.path}>
                                        <span>{item.title}</span>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                </Space>
            </div>
            <div className="layout-header-right flex align-center">
                <div className="right-item version">
                    <img src={vip} alt="" />
                    <span>专业版</span>
                </div>
                {/* <div className="right-item home">
                    <img src={home} alt="" />
                    <span>站点主页</span>
                </div> */}
                <div className="right-item help">
                    <img src={help} alt="" />
                    <a
                        href="https://help.dangkoubao.com"
                        target="_blank"
                    >
                        帮助中心
                    </a>
                </div>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                    <div className="right-item avatar">
                        <Avatar
                            size={36}
                            style={{
                                color: '#fff',
                                fontSize: '12px',
                                background: 'linear-gradient(180deg, #9861f6 0%, #7d32ff 100%)'
                            }}
                        >
                            张明
                    </Avatar>
                        <img src={arrowBottom} alt="" />
                    </div>
                </Dropdown>
            </div>
        </header>
    )
})

/**
 * 生成面包屑
 * @param {Array} router 路由数组 
 */
const renderTag = (router, pathname) => {
    let paths = []
    // console.log(router, pathname);
    router.forEach((item) => {
        if (item.path === pathname) {
            paths = [{ path: item.path, title: item.title }]
        } else if (item.children && pathname.includes(item.path)) {
            paths = [...paths, { path: item.path, title: item.title }, ...renderTag(item.children, pathname)]
        }
    })

    return paths
}