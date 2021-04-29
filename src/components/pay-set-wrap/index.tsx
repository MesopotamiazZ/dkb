import React, { memo } from 'react';
import { Badge, Divider, Avatar } from 'antd';
import './style.less';
import wechat from '../../assets/images/wechat.svg';

interface paySetWrapProps {
  img: any;
  title: string;
  content: string;
  status: string | number;
}

enum operactorText {
  SET = '设置',
  OPEN = '开通'
}

const opened = (
  <Badge status="success" text="已开通" />
)

const notOpen = (
  <Badge status="default" text="未开通" />
)

const PaySetWrap: React.FC<paySetWrapProps> = memo((props) => {
  const {
    img,
    title,
    content,
    status,
  } = props;
  return (
    <div className="pay-set-wrap">
      <div className="pay-set-wrap-img">
        <Avatar shape="square" src={img} />
      </div>
      <div className="pay-set-wrap-main">
        <div className="title">
          <span className="title-name">{title}</span>
          <span className="title-status">
            {Number(status) === 1 ? opened : notOpen}
          </span>
        </div>
        <div className="content">
          {content}
        </div>
      </div>
      <Divider type="vertical" />
      <div className="pay-set-wrap-right">
        {Number(status) === 1 ? operactorText.SET : operactorText.OPEN}
      </div>
    </div>
  )
})

PaySetWrap.defaultProps = {
  img: wechat,
}

export default PaySetWrap;