import React from 'react';
import { Switch } from 'antd';
import './style.less';

interface toogleTipWrapProps {
  isOpen: boolean;
  title: string;
  content: string;
  onToogle: () => void;
}

const ToogleTipWrap: React.FC<toogleTipWrapProps> = (props) => {
  const {
    isOpen,
    title,
    content,
    onToogle,
  } = props;

  return (
    <div className="toogle-tip-wrap">
      <div className="wrap-title">
        <div className="wrap-title-left">
          {title}
        </div>
        <div className="wrap-title-right">
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={isOpen}
            onChange={onToogle}
          />
        </div>
      </div>
      <div className="wrap-content">
        {content}
      </div>
    </div>
  )
}

ToogleTipWrap.defaultProps = {
  isOpen: false,
}

export default ToogleTipWrap;