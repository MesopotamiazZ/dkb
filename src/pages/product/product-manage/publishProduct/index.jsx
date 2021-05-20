import React, { memo, useState } from 'react';
import { Form, message } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../store/slice';
import { baseUrl } from '@/utils/upload';
import SelfForm from '@/components/add-form';
import './style.less';

const PublishProduct = memo(() => {
  const dispatch = useDispatch();

  const [initValue, setInitValue] = useState({});

  const formProps = {
    initValue,
    formArr: [
      {
        title: '基本信息',
        search: [
          {
            wrap: {
              key: 'title',
              name: 'title',
              label: '商品名称',
              type: 'input',
              rules: [
                { required: true, message: '请填写商品名称' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              placeholder: '请填写商品名称',
            }
          }
        ]
      },
      {
        title: '价格库存',
        search: [

        ]
      },
      {
        title: '配送设置',
        search: [
          {
            wrap: {
              key: 'delivery',
              name: 'delivery',
              label: '配送支持',
              type: 'checkbox',
              rules: [
                { required: true, message: '请选择配送支持' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              enum: [
                { value: 'express', label: "快递配送" },
                { value: 'stores', label: "门店自提" },
                { value: 'localexp', label: "同城配送" },
              ]
            }
          },
        ]
      },
      {
        title: '价格库存',
        search: [
          {
            wrap: {
              key: 'status',
              name: 'status',
              label: '商品状态',
              type: 'radio',
              rules: [
                { required: true, message: '请选择商品状态' },
              ],
              labelCol: {
                span: 2,
              },
            },
            props: {
              enum: [
                { value: '1', label: "立即上架" },
                { value: '3', label: "放入仓库" },
              ]
            }
          },
        ]
      },
    ]
  }

  return (
    <div className="publish-product">
      <div className="publish-product-inner outer-area">
        <SelfForm
          formProps={formProps}
        />
      </div>
    </div>
  )
})

export default PublishProduct;