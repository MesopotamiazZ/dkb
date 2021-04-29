import React from 'react';
import roundCheck from '@/assets/images/roundcheckfill.png'
import roundClose from '@/assets/images/roundclosefill.png'
import '@/assets/css/result-tip.less';

const returnResultMsg = ({type, msg}) => {
  if (type === 'success') {
    return {
      content: (
        <div className="result-tip-content">
          <div className="result-tip-icon">
            <img src={roundCheck} alt=""/>
          </div>
          <div className="result-tip-msg">{msg}</div>
        </div>
      ),
      className: 'result-tip-success',
      style: {
        marginTop: '40vh'
      }
    }
  }
  if (type === 'error') {
    return {
      content: (
        <div className="result-tip-content">
          <div className="result-tip-icon">
            <img src={roundClose} alt=""/>
          </div>
          <div className="result-tip-msg">{msg}</div>
        </div>
      ),
      className: 'result-tip-error',
      style: {
        marginTop: '40vh'
      }
    }
  }
}

export default returnResultMsg