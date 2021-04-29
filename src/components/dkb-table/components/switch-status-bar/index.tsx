import React, { memo, useState } from 'react';
import { Itabs, tableDataType } from '../../type';
import './style.less';

const SwitchStatusBar: React.FC<Itabs> = memo((props) => {
  const {
    defaultKey,
    name,
    data,
    onChange,
  } = props;

  const [curKey, setCurKey] = useState(defaultKey); // 当前

  const onClickHandler = (name, value) => {
    setCurKey(value)
    onChange(name, value)
  }

  return (
    <div className="switch-status-bar">
      {
        data?.map((item) => (
          <div
            key={item.key}
            className={['tab-item', curKey === item.key ? 'status-active' : ''].join(' ')}
            onClick={() => onClickHandler(name, item.key)}
          >
            {item.label}
          </div>
        ))
      }
      {/* <div className="tab-item status-active">全部订单</div>
      <div className="tab-item">全部订单</div>
      <div className="tab-item">全部订单</div>
      <div className="tab-item">全部订单</div> */}
    </div>
  )
})

export default SwitchStatusBar;