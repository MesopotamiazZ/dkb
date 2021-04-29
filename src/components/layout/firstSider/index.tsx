import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import routersAll from '../../../router';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import SecondSider from '../secondSider';
import './style.less';

export const icons = {
  HomeOutlined: <HomeOutlined style={{ fontSize: '20px' }} />
}

interface firstSiderProps {
  accountInfo: any;
  routes: any;
  currentPath: string;
  goto: () => void;
  redirectTo: () => void;
}

const FirstSider: React.FC<firstSiderProps> = (props) => {
  const history = useHistory();
  const location = useLocation();

  const {
    accountInfo,
    routes,
    currentPath,
    goto,
    redirectTo,
  } = props;

  // const [currentPath, setCurrentPath] = useState('') //当前路由
  const [isSecondSider, setIsSecondSider] = useState(false); // 是否显示二级菜单
  const [curChild, setCurChild] = useState(); // 当前二级菜单routes
  const [curTitle, setCurTitle] = useState(''); // 当前二级菜单title

  /**
   * 解决刷新secondSide隐藏的问题
   */
  useEffect(() => {
    const pathname = location.pathname;
    const len = pathname.split('').filter(item => item === '/').length;
    const path = `/${pathname.split('/')[1]}`
    // console.log(len, path);
    if (len > 1) {
      setIsSecondSider(true);
      const route = routes.filter((route) => (route.path === path))[0];
      setCurChild(route.children);
      setCurTitle(route.title);
    }
  }, [])

  /**
   * 创建一级菜单
   * @param {Array} routes 路由配置表
   * @param {Function} goto 页面跳转
   * @param {Object} location window.location
   * @param {String} currentPath 当前路由
   */
  const createFirstMenu = (routes, goto, location, currentPath) => {
    return (<>
      {
        routes.map(mItem => {
          // console.log('mItem.children', mItem.children)
          // console.log(mItem.path, location.pathname)
          if (mItem.children && !mItem.componentPath) { // 有下一级
            return (
              <div
                className={['sub-slider-wrap', (mItem.path === location.pathname
                  || location.pathname.indexOf(mItem.path) === 0) ? 'active' : ''].join(' ')}
                key={mItem.path}
                onClick={() => {
                  setCurChild(mItem.children)
                  setCurTitle(mItem.title)
                  setIsSecondSider(true)
                  goto(!!mItem.children[0].componentPath ? mItem.children[0].path : mItem.children[0].children[0].path)
                }}
              >
                <div className="sub-slider-icon">{icons[mItem.icon]}</div>
                <div className="sub-slider-title">{mItem.title}</div>
              </div>
            )
          } else { // 只有一级
            return !mItem.hidden ? <div
              className={['sub-slider-wrap', mItem.path === location.pathname ? 'active' : ''].join(' ')}
              key={mItem.path}
              onClick={() => {
                setIsSecondSider(false)
                goto(mItem.path)
              }}
            >
              <div className="sub-slider-icon">{icons[mItem.icon]}</div>
              <div className="sub-slider-title">{mItem.title}</div>
            </div> : null
          }
        })
      }
    </>)
  }

  return (
    <>
      <div className="first-sider">
        {
          accountInfo?.avatar
            ? <Avatar size={38} src={accountInfo.avatar} />
            : <Avatar size={38} icon={<UserOutlined />} />
        }
        {
          createFirstMenu(routes, goto, location, currentPath)
        }
      </div>
      <SecondSider
        classNames={[!isSecondSider ? 'is-hidden' : '']}
        title={curTitle}
        childRoutes={curChild}
        goto={goto}
        redirectTo={redirectTo}
      />
    </>
  )
}

export default FirstSider;