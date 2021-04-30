import React from 'react';
import { Tooltip } from 'antd';
import './style.less';
import qrcode from '../../../../assets/images/qr-code.png';
import computer from '../../../../assets/images/computer.png';

interface toogleProps {
  styles: number | string;
  onToogle: () => void;
}

const ToogleLoginStyle: React.FC<toogleProps> = (props) => {
  const {
    styles,
    onToogle
  } = props;

  return (
    <div className={['toogle-login-style', (styles === 1 || styles === 2) ? '' : 'dis-none'].join("")}>
      <img
        src={styles === 1 ? qrcode : computer}
        style={{
          width: styles === 1 ? '40px' : '30px',
          height: styles === 1 ? '40px' : '30px',
        }}
        alt=""
        onClick={onToogle}
      />
      <Tooltip
        placement="left"
        visible
        title={styles === 1 ? '微信登录' : '密码登录'}
        color="rgba(0,123,255, 0.3)"
      >
        <div className="triganle" onClick={onToogle}>
        </div>
      </Tooltip>
    </div>
  )
}

export default ToogleLoginStyle;