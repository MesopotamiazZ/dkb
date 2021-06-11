import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import ProTable from '@/components/pro-table'

// 表单配置
const formProps = {
    search: [
        {
            wrap: {
                key: 'name',
                name: 'name',
                label: '用户名称',
                type: 'input',
                col: {
                    xs: 24,
                    sm: 8,
                    xl: 6
                }
            },
            props: {
                placeholder: '请输入商品名称',
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

        layout: 'inline'
    }
}

export default memo(function () {

    const history = useHistory();

    /**
     * 查看
     * @param {string} id 
     */
    const handleLook = id => {
        history.push({
            pathname: '/orders/jd-list/detail',
            state: { id }
        })
    }

    // 表格行配置
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <button>{text}</button>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: '操作',
            dataIndex: '',
            render: (record, text) => {
                return <button onClick={() => handleLook(record.id)}>查看</button>
            }
        },
    ];


    return (
        <div>
            <ProTable url="mork/jd-list/table" title="用户管理" formProps={formProps} columns={columns} rowKey="id" />
        </div>
    )
})
