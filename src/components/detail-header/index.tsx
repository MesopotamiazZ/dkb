import React from 'react';
import { Avatar } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import './style.less';

type othersObject = {
  label: string | React.ReactNode,
  str: string | NodeList,
}

type DetailpropsType = {
  title: string,
  otherArrs: Array<othersObject>,
  hasAvatar?: boolean;
  img?: any,
  subTitle?: string,
}

type DetailHeaderProps = {
  renderOpertor: React.ReactNode,
  renderStatisticsCard?: React.ReactNode,
  detailProps: DetailpropsType,
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ detailProps, renderOpertor, renderStatisticsCard }) => {
  return (
    <div className="detail-header">
      {
        detailProps.hasAvatar && <div className="detail-header-avatar">
          {
            !detailProps.img ? <Avatar
              style={{ backgroundColor: '#87d068', width: '72px', height: '72px' }}
              icon={<HomeOutlined className="home-icon" />}
            /> : <Avatar
              style={{ backgroundColor: '#87d068', width: '72px', height: '72px' }}
              src={detailProps.img}
            />
          }
        </div>
      }
      <div className={['detail-header-info', !renderStatisticsCard && 'flex-1'].join(' ')}>
        <div className="info-title">
          {detailProps.title}
          {
            detailProps.subTitle && <span className="info-sub-title">
              {detailProps.subTitle}
            </span>
          }
        </div>
        <div className="info-others">
          {
            detailProps.otherArrs.map((item, index) => (
              <div className="info-others-item" key={index}>
                <span>{item.label}</span>
                <span>{item.str}</span>
              </div>
            ))
          }
        </div>
        <div className="info-operactor">
          {renderOpertor}
        </div>
      </div>
      {
        renderStatisticsCard && <div className="detail-header-datas">
          {renderStatisticsCard}
        </div>
      }
    </div>
  )
}

DetailHeader.defaultProps = {
  detailProps: {
    hasAvatar: true,
    title: '',
    otherArrs: [],
    img: '',
    subTitle: '',
  }
}

export default DetailHeader