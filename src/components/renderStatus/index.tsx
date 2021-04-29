import React from 'react';
import { Button } from 'antd';
import { statusEnum } from '../../utils/enum';
import './style.less';

interface statusProps {
  status_msg: string;
  status: string | number;
}

const RenderStatus: React.FC<statusProps> = (props) => {
  const {
    status_msg,
    status,
  } = props;
  return (
    <div className="render-status">
      <div className="render-status-msg">{status_msg}</div>
      <div className=""><Button type="link">[发货]</Button></div>
    </div>
  )
}

export default RenderStatus;