/**
 * 订单备注 标记
 */
import React, { memo, useEffect, useState } from 'react';
import { Tag } from 'antd';
import './style.less';

interface datasProps {
  id: number;
  name: string;
  color: string;
}

interface IRemarkFlag {
  datas: Array<datasProps>;
  flag: number;
  onClick: (id: number) => void;
}

const RemarkFlag: React.FC<IRemarkFlag> = memo((props) => {
  const {
    datas,
    flag,
    onClick,
  } = props;

  const [curFlag, setCurFlag] = useState(1);

  useEffect(() => {
    setCurFlag(flag);
  }, [flag])

  return (
    <div className="remark-flag">
      {
        datas.map((data) => {
          return (
            <Tag
              key={data.id}
              className={['tag-item', curFlag === data.id ? 'tag-active' : ''].join(' ')}
              onClick={() => onClick(data.id)}
            >
              <div className="circle-point" style={{ background: data.color }}></div>
              {data.name}
            </Tag>
          )
        })
      }
    </div>
  )
})

RemarkFlag.defaultProps = {
  flag: 1,
}

export default RemarkFlag;