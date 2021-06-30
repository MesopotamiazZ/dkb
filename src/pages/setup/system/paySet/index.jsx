import React, { useEffect } from 'react';
import PaySetWrap from '@/components/pay-set-wrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import './style.less';
import alipay from '@/assets/images/alipay.svg';
import wechat from '@/assets/images/wechat.svg';

const Overview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  let {
    payment,
  } = useSelector(state => state['system'], shallowEqual) //store数据

  const {
    getPaymentListActionAsync
  } = actions;

  const initialData = () => {
    dispatch(getPaymentListActionAsync());
  }

  useEffect(() => {
    initialData();
  }, [])
  console.log('payment', payment)

  return (
    <div className="pay-set outer-area">
      <div className="pay-set-inner bg-white">
        <PaySetWrap
          img={wechat}
          title="微信支付"
          content="资金结算至法人对私/公司对公卡，结算时扣除0.6%交易手续费（微信收取）。
          （仅支持境内使用，支付宝内无法使用微信支付））"
          status={1}
        />
        <PaySetWrap
          img={alipay}
          title="支付宝支付"
          content="资金结算至法人对私/公司对公卡，结算时扣除0.6%交易手续费（支付宝收取）。
          （仅支持境内使用，微信内无法使用支付宝支付）"
          status={1}
        />
        <PaySetWrap
          img={alipay}
          title="货到付款"
          content="启用货到付款后，请自行安排合作快递完成收款和结算。"
          status={1}
        />
        <PaySetWrap
          img={alipay}
          title="挂单"
          content="本功能需建立在商户与其客户的信任之上，对指定客户给予自定义额度授信，客户使用额度赊账下单。"
          status={1}
        />
        <PaySetWrap
          img={alipay}
          title="收款账号"
          content="资金结算至法人对私/公司对公卡，结算时扣除0.6%交易手续费（支付宝收取）。
          （仅支持境内使用，微信内无法使用支付宝支付）"
          status={1}
        />
      </div>
    </div>
  )
}

export default Overview;