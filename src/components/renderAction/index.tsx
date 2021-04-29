import React from 'react';
import { Button, Divider } from 'antd';
import './style.less';

type tType =
  'link' | 'default' | 'primary' | 'text' | 'ghost' | 'dashed';

type classNameType =
  'detail-btn' | 'edit-btn' | 'add-btn' | 'up-btn'
  | 'down-btn' | 'thaw-btn' | 'froen-btn' | 'del-btn';

type actionType = 'row' | 'column';

interface btnObj {
  key: string | number;
  text: string;
  type: tType;
  classNames: Array<classNameType>;
  onActionClick: (key: string | number, record: Object) => void;
}

interface RenderActionProps {
  record: Object;
  getBtns: (record: Object) => Array<btnObj>;
  type: actionType;
}

const RenderAction: React.FC<RenderActionProps> = (props) => {
  const {
    record,
    getBtns,
    type,
  } = props;

  const btns = getBtns(record);
  const len = btns.length;

  return (
    <div
      className={['render-action', type === 'column' ? 'flex-column' : ''].join(' ')}
    >
      {
        btns?.map((btn, index) => (
          <div key={btn.key}>
            <Button
              // className={btn.classNames.join(' ')}
              type={btn.type || 'link'}
              onClick={() => btn.onActionClick(btn.key, record)}
            >
              {btn.text}
            </Button>
            {
              // index !== len - 1 && <Divider type="vertical" />
            }
          </div>
        ))
      }
    </div>
  )
}

RenderAction.defaultProps = {
  type: 'column'
}

export default RenderAction