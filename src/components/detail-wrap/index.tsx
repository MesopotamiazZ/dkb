import * as React from 'react';
import { Divider, Button } from 'antd';

import './style.less';

interface imageObj {
  url: string;
  text: string;
}

interface infoObj {
  label: string;
  text: string;
  isBottomLine?: boolean;
}

interface detailWrapProps {
  title: string;
  imageData: Array<imageObj>;
  infoData: Array<infoObj>;
  onEditClick: Function;
}

const DetailWrap: React.FC<detailWrapProps> = ({ title, imageData, infoData, onEditClick }) => {
  return (
    <div className="detail-wrap">
      <div className="detail-wrap-head">
        <span>{title}</span>
        <Button
          className="modify-btn"
          onClick={() => onEditClick()}
        >
          修改
        </Button>
      </div>
      <div className="detail-wrap-body">
        <div className="body-imgs">
          {
            imageData.map((data) => (
              <div className="img-item" key={data.text}>
                <img src={data.url} className="img-item-img" alt="" />
                <div className="img-item-text">{data.text}</div>
              </div>
            ))
          }
        </div>
        <div className="body-contents">
          {
            infoData.map((data) => {
              if (data.isBottomLine) {
                return (
                  <>
                    {
                      data.text ? (
                        <>
                          <div className="body-content-line" key={data.label}>
                            <span className="label">{data.label}</span>
                            <span className="text">{data.text}</span>
                          </div>
                          <Divider
                            dashed
                            style={{width: '90%', position: 'relative', left: '-30px', color: '#d5d5d5', margin: '32px 0'}}
                          />
                        </>
                      ) : ''
                    }
                  </>
                )
              } else {
                return (
                  <>
                    {
                      data.text ? (
                        <div className="body-content-line" key={data.label}>
                          <span className="label">{data.label}</span>
                          <span className="text">{data.text}</span>
                        </div>
                      ) : ''
                    }
                  </>
                )
              }
            })
          }
        </div>
      </div>
      <div className="detail-wrap-foot">
      </div>
    </div>
  )
}

export default DetailWrap