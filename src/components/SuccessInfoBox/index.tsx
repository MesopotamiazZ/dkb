import * as React from 'react';
import { Divider } from 'antd';

import './style.less';

interface contentObj {
  id: number;
  title?: string;
  sub?: string | React.ReactNode;
  is_divider?: boolean,
}

interface successInfoProps {
  contents: Array<contentObj>;
}

const SuccessInfoBox: React.FC<successInfoProps> = ({ contents }) => {
  return (
    <div className="success-info-box">
      {
        contents.map((content) => (
          <div
            key={content.id}
            className="box-item"
          >
            <div className="box-item-title">{content.title}</div>
            <div className="box-item-container">
              {content.sub}
            </div>
            {content.is_divider && <Divider dashed />}
          </div>
        ))
      }
    </div>
  )
}

export default SuccessInfoBox