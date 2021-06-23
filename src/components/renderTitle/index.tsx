import React from 'react';
import { Avatar } from 'antd';
import './style.less';

type modeType = 'column' | 'row';

type alignType = 'left' | 'center' | 'right';

type shapeProps = 'square' | 'circle';
interface RenderTitleProps {
  mainTitle: string;
  subTitle: string | Array<string>;
  mode: modeType;
  titleStyle: any;
  avatar: any;
  avatar_size?: number;
  avatar_shape?: shapeProps;
}

const RenderTitle: React.FC<RenderTitleProps> = (props) => {
  const {
    mainTitle,
    subTitle,
    mode,
    avatar,
    titleStyle,
    avatar_size,
    avatar_shape,
  } = props;
  return (
    <div className="render-wrap">
      {
        avatar && <Avatar src={avatar} shape={avatar_shape} size={avatar_size} />
        // <div className="render-avatar">
        //   <img src={avatar} alt="" />
        // </div>
      }
      <div className="render-title" style={{ ...titleStyle, flexDirection: mode }}>
        <div
          className={['render-main-title', mode === 'column' ? 'column-text' : ''].join(' ')}
          style={{
            color: 'rgba(16, 16, 16, 100)',
          }}
        >
          {mainTitle}
        </div>
        {
          subTitle instanceof Array
            ? subTitle.map((text) => (
              <div
                className={['render-sub-title', mode === 'row' ? 'row-margin' : 'column-text'].join(' ')}
                style={{ color: mode === 'column' ? 'rgba(146, 146, 146, 100)' : 'rgba(16, 16, 16, 100)' }}
              >
                {text}
              </div>
            )) : <div
              className={['render-sub-title', mode === 'row' ? 'row-margin' : 'column-text'].join(' ')}
              style={{ color: mode === 'column' ? 'rgba(146, 146, 146, 100)' : 'rgba(16, 16, 16, 100)' }}
            >
              {subTitle}
            </div>
        }
      </div>
    </div>
  )
}

RenderTitle.defaultProps = {
  mode: 'column',
  titleStyle: {},
  avatar_size: 80,
  avatar_shape: 'square'
}

export default RenderTitle