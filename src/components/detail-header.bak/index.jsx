import React, { memo } from 'react'
import { Image } from 'antd';
import './index.less'

export default memo((props) => {

  const { info, operations, cards = [] } = props

  const card = (cards) => {
    return cards.map((item) => {
      return <div
        className='pay-card flex flex-column align-item-center space-center border-radius-4 text-white'
        key={item.label}
      >
        <div className='text-14 font-600 align-item-baseline' style={{ textAlign: 'center' }}>
          <div>{item.label}</div>
          <div>{item.coin}</div>
        </div>
      </div>
    })
  }

  return (
    <div className='account-info bg-white p-16 border-radius-4'>
      <div className='flex flex-row space-between align-item-center'>
        <div className='left-box flex flex-row'>
          {
            info.shop?.logo ? (
              <Image
                width={72}
                className="org-img"
                src={info.shop?.logo}
              />
            ) : ''
          }

          <div className=' flex flex-column px-24'>
            <div className='text-20 font-600 mb-4'>{info.shop?.shop_name}</div>
            {/* <div className='text-gray text-14 mb-2'>登录账号：{info.shop?.account}</div> */}
            <div className='text-gray text-14 mb-8'>地址：{info.shop?.address}</div>
            <div>{operations}</div>
          </div>
        </div>
        <div className='right-box flex flex-row align-item-center'>
          {card(cards)}
        </div>
      </div>
    </div>
  )
})
