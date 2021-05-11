import React from 'react';
import { Button, Badge } from 'antd';
import { statusEnum } from '../../utils/enum';
import './style.less';

type typeStr = 'default' | 'circle';
type badgeStatus = 'success' | 'error' | 'default' | 'processing' | 'warning';
interface statusProps {
  type?: typeStr;
  status_msg?: string;
  status?: string | number;
  badge_status?: badgeStatus;
  badge_text?: Array<any>;
}

const RenderStatus: React.FC<statusProps> = (props) => {
  const {
    type,
    status_msg,
    status,
    badge_status,
    badge_text,
  } = props;
  return (
    <div className="render-status">
      {
        type === 'default' ? <>
          <div className="render-status-msg">{status_msg}</div>
          <div className=""><Button type="link">[发货]</Button></div>
        </> : <Badge status={badge_status} text={badge_text} />
      }

    </div>
  )
}

RenderStatus.defaultProps = {
  type: 'default'
}

export default RenderStatus;