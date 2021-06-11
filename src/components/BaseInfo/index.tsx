import * as React from 'react';
import { useHistory } from 'react-router-dom';
import DetailWrap from '../detail-wrap';
import moment from 'moment';
import './style.less';

// 结算方式
// const settleTypeEnum = {
//   TOPUBLIC: 1, // 对公
//   LEGALTOPRIVATE: 2, // 法人对私
//   NOTTOPRIVATE: 3, // 非法人对私
// }

const BaseInfo = ({ detail, helipayDetail }) => {

  const history = useHistory();
  const onEditClickHandler = () => {
    history.push({
      pathname: '/merchantManage/add',
      state: {
        id: detail.merchant_id,
      }
    })
  }
  return (
    <div className="base-info">
      <DetailWrap
        title="执照信息"
        imageData={[
          {
            url: detail && detail.business_license_img_url,
            text: '营业执照'
          },
        ]}
        infoData={[
          {
            label: '商户名',
            text: detail && detail.merchant_name,
          },
          {
            label: '社会信用代码',
            text: detail && detail.org_num,
          },
          {
            label: '所在省市',
            text: ''
          },
          {
            label: '通讯地址',
            text: detail && detail.address,
          },
          {
            label: '营业期限',
            text: detail && (
              (detail.business_start_date || detail.business_start_date !== '11111111')
                ? moment(detail.business_start_date * 1000).format('YYYY年MM月DD日') + ' 至 ' + moment(detail.business_end_date * 1000).format('YYYY年MM月DD日')
                : moment(detail.business_start_date * 1000).format('YYYY年MM月DD日')
            )
          },
        ]}
        onEditClick={onEditClickHandler}
      />
      <DetailWrap
        title="法人资料"
        imageData={[
          {
            url: detail && detail.id_card_front_img_url,
            text: '正面照'
          },
          {
            url: detail && detail.id_card_back_img_url,
            text: '背面照'
          },
        ]}
        infoData={[
          {
            label: '法人姓名',
            text: detail && detail.legal_person,
          },
          {
            label: '身份证号码',
            text: detail && detail.legal_person_id,
          },
          {
            label: '身份证有效期',
            text: detail && (
              (detail.id_card_end_date || detail.id_card_end_date !== '11111111')
                ? moment(detail.id_card_start_date * 1000).format('YYYY年MM月DD日') + ' 至 ' + moment(detail.id_card_end_date * 1000).format('YYYY年MM月DD日')
                : moment(detail.id_card_start_date * 1000).format('YYYY年MM月DD日')
            )
          },
          {
            label: '联系电话',
            text: detail && detail.mobile,
          },
          {
            label: '联系邮箱',
            text: detail && detail.email
          },
        ]}
        onEditClick={onEditClickHandler}
      />
      <DetailWrap
        title="结算及费率"
        imageData={[
          {
            url: detail && (detail.bank_card_front_img_url || detail.opening_account_license_img_url),
            text: '开户及其他凭证'
          },
        ]}
        infoData={[
          {
            label: '结算方式',
            text: detail && detail.settle_card_type_msg,
          },
          {
            label: '开户名',
            text: detail && detail.settle_card_account_name,
          },
          {
            label: '对公账号',
            text: detail && detail.settle_card_account,
          },
          {
            label: '开户行',
            text: '',
          },
        ]}
        onEditClick={onEditClickHandler}
      />
    </div>
  )
}

export default BaseInfo