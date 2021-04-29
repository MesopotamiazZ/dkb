import React from 'react';
import './style.less';

type modeType = 'column' | 'row';

interface RenderTitleProps {
  mainTitle: string;
  subTitle: string;
  mode: modeType;
  avatar: any;
}

const RenderTitle: React.FC<RenderTitleProps> = ({ mainTitle, subTitle, mode, avatar }) => {
  return (
    <div className="render-wrap">
      {
        avatar && <div className="render-avatar">
          <img src={avatar} alt="" />
        </div>
      }
      <div className="render-title" style={{ flexDirection: mode }}>
        <div
          className={['render-main-title', mode === 'column' ? 'column-text' : ''].join(' ')}
          style={{
            color: 'rgba(16, 16, 16, 100)',
          }}
        >
          {mainTitle}
        </div>
        <div
          className={['render-sub-title', mode === 'row' ? 'row-margin' : 'column-text'].join(' ')}
          style={{ color: mode === 'column' ? 'rgba(146, 146, 146, 100)' : 'rgba(16, 16, 16, 100)' }}
        >
          {subTitle}
        </div>
      </div>
    </div>
  )
}

RenderTitle.defaultProps = {
  mode: 'column'
}

export default RenderTitle