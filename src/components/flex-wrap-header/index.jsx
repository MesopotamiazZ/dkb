import React, { useEffect } from 'react';
import './style.less';

const FlexWrapHeader = (props) => {
  const {
    colors = ['#00AB8C', '#00A2D5', '#5461DB', '#904EE2'],
    dataConfig = [],
  } = props;

  return (
    <div
      className="flex-wrap-header flex"
    >
      {
        dataConfig.map((data, index) => (
          <div
            key={index}
            className="data-wrap flex-1"
            style={{ background: colors[index] }}
          >
            <div className="data-wrap-title">
              {data.title}
            </div>
            <div className="data-wrap-data">
              {data.data}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default FlexWrapHeader;