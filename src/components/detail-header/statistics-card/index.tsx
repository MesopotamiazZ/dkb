import React from 'react';
import { Divider } from 'antd';

import './style.less';

type contentType = {
  name: string,
  number: string | number,
}

type statisticsCardProps = {
  bgColor?: string,
  bgImg?: HTMLImageElement | any,
  contents: Array<contentType>,
}

const StatisticsCard: React.FC<statisticsCardProps> = ({bgColor = '#904EE2', bgImg, contents = []}) => {
  return (
    <div
      className="statistics-card"
      style={{ backgroundColor: bgColor }}
    >
      {
        contents.map((content, index) => (
          <div key={content.name}>
          <div className="statistics-card-item">
            <div className="card-number">
              {content.number}
            </div>
            <div className="card-name">
              {content.name}
            </div>
          </div>
          {
            contents.length === 2 && index === 0 ? (
              <Divider type="vertical" style={{backgroundColor: '#fff'}} />
            ) : ''
          }
          </div>
        ))
      }
      
    </div>
  )
}

export default StatisticsCard