import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';
import './style.less';

interface secondSiderProps {
  classNames: string[];
  title: string;
  childRoutes: any;
  goto: (string) => void;
  redirectTo: (string) => void;
}

const SecondSider: React.FC<secondSiderProps> = (props) => {
  const history = useHistory()
  const location = useLocation()

  const {
    classNames,
    title,
    childRoutes,
    goto,
    redirectTo,
  } = props;

  // console.log(childRoutes);

  /**
   * 展开二级
   */
  const expanMenu = () => {

  }

  /**
   * 创建二三级菜单
   * @param childRoutes 
   * @param goto 
   * @param location 
   */
  const createSubMenu = (childRoutes, goto, location) => {
    // const parent = childRoutes.find(item => item.children?.some(cItem => cItem.path === location.pathname))
    return (
      <>
        {
          childRoutes?.map(mItem => {
            // console.log('mItem22', mItem);
            if (mItem.children && !mItem.componentPath) { // 有下一级
              // console.log('1： 有下一级');
              return (
                <div
                  key={mItem.key}
                  className="second-sider-menu"
                  onClick={expanMenu}
                >
                  <div className="second-sider-menu-text">
                    <DownOutlined />
                    <span>{mItem.title}</span>
                  </div>
                  {
                    mItem.children.filter(child => (!child.hidden)).map(smItem => {
                      return (
                        <div
                          key={smItem.key}
                          className={
                            [
                              'third-sider-menu',
                              smItem.path === location.pathname ? 'active' : '',
                              // mItem.expan ? 'is-hidden' : ''
                            ].join(' ')
                          }
                          onClick={() => goto(smItem.path)}
                        >
                          <div className="third-sider-menu-text">
                            <span>{smItem.title}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            } else if (!mItem.hidden) { // 只有一级
              return (
                <>
                  {mItem.borderTop && <Divider />}
                  <div
                    key={mItem.key}
                    className={
                      [
                        'second-sider-menu',
                        mItem.path === location.pathname ? 'active' : '',
                        'only-one'
                      ].join(' ')
                    }
                    onClick={() => {
                      if (mItem.redirect) {
                        redirectTo(mItem.redirectPath)
                      } else {
                        goto(mItem.path)
                      }
                    }}
                  >
                    <div className="seconds-sider-menu-text">
                      <span>{mItem.title}</span>
                    </div>
                  </div>
                </>
              )
            }
          })
        }
      </>
    )
  }

  return (
    <div className={['second-sider'].concat(classNames).join(' ')}>
      <div className="second-sider-header">
        {title}
      </div>
      <div className="second-sider-content">
        {
          createSubMenu(childRoutes, goto, location)
        }
      </div>
    </div>
  )
}

export default SecondSider;