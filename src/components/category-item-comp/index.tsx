/*
 * @Author: wzd
 * @Date: 2020-06-23 15:24:24
 * @Description: 商品类目组件
 */
import React, { useState } from 'react';
import { Button } from 'antd';

import './style.less';

interface IData {
  id: number;
  name: string;
}

interface ICategoryItem {
  title: string;
  isShowOperator: boolean;
  datas: Array<IData>;
  onChange: (id: string | number) => void;
  active: number;
  liWidth: string | number;
}

const CategoryItemComp: React.FC<ICategoryItem> = (props) => {
  const [isDisplayItem, setIsDisplayItem] = useState(false);

  const {
    title,
    isShowOperator,
    datas,
    onChange,
    liWidth,
    active,
  } = props;

  const displayCategory = (e) => {
    if (!isDisplayItem) {
      setIsDisplayItem(true);
      e.currentTarget.firstChild.innerHTML = '收起';
    } else {
      setIsDisplayItem(false);
      e.currentTarget.firstChild.innerHTML = '展开';
    }
  };

  return (
    <div className="product-category" style={{ height: (isDisplayItem) ? 'auto' : '100%' }}>
      <div className="category-title">
        {title}
：
      </div>
      <ul className="category-items">
        {
          datas.slice().map((item) => (
            <li
              className={['category-item', active === item.id ? 'item-active' : ''].join(' ')}
              style={{ minWidth: liWidth ? `${liWidth}px` : '58px' }}
              key={item.name + item.id}
              onClick={() => onChange(item.id)}
            >
              {item.name}
            </li>
          ))
        }
      </ul>
      <div className="operator" style={{ display: (isShowOperator) ? '' : 'none' }}>
        {/* <Button type="link" size="small" className="edit-btn">
          编辑
        </Button> */}
        <Button type="link" size="small" className="display-btn" onClick={(e) => displayCategory(e)}>
          展开
        </Button>
      </div>
    </div>
  );
};

export default CategoryItemComp;
