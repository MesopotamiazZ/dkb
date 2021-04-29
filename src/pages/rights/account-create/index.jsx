import React, { memo } from 'react'
import ProForm from '@/components/pro-form'

export default memo(function () {

    const formProps = {
        search: [
            {
                wrap: {
                    key: 'id',
                    name: 'id',
                    label: '员工工号',
                    type: 'input',
                },
                col: {
                    xs: 24,
                    sm: 24,
                    xl: 24
                },
                props: {
                    placeholder: '请输入订单编号',
                }
            },
            {
                wrap: {
                    key: 'order_date',
                    name: 'order_date',
                    label: '下单时间',
                    type: 'rangePicker',
                },
                props: {},
            },

        ],
        config: {
            submit: {
                text: '查询'
            },
            reset: {
                text: '重置'
            }
        },
        layoutConfig: {

            layout: 'inline',
            // wrapperCol:{
            //     lg:8
            // }
        }
    }

    return (
        <div>
            创建账号
            <ProForm formProps={formProps} />
        </div>
    )
})
