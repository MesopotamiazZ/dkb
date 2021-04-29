import React from 'react';
import './style.less';

const ExpandDetail = (props) => {
  const {
    expandData
  } = props;

  return (
    <div className="expand-detail">
        <div className="expanded-inner">
          {
            expandData.map((data) => (
              <div className="expanded-inner-data" key={data.label}>
                <p>
                  <span className="label-name">{data.label}：</span>
                  {
                    !data.datas instanceof Array
                      ? <span>{data.datas}</span>
                      : data.datas.map((item) => (
                        <span key={item}>{item}</span>
                      ))
                  }
                </p>
              </div>
            ))
          }
        </div>
      </div>
  )
}

export default ExpandDetail;