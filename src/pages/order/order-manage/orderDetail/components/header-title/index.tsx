import React, { memo } from 'react';
import './style.less';

interface IHeaderTitle {
  title: string;
  fontSize?: number;
  color?: string;
}

const HeaderTitle: React.FC<IHeaderTitle> = memo((props) => {
  const {
    title,
    fontSize,
    color
  } = props;

  return (
    <div
      className="header-title"
      style={{ fontSize: fontSize + 'px', color: color }}
    >
      {title}
    </div>
  )
})

export default HeaderTitle;