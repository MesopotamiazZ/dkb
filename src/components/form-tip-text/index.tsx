import React, { memo } from 'react';
import './style.less';
interface tipProps {
  tip: string;
}

const FormTipText: React.FC<tipProps> = memo((props) => {
  return (
    <div className="form-tip-modal">
      {props.tip}
    </div>
  )
})

export default FormTipText;