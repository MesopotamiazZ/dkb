import React, { memo } from 'react'
import ProTable from '@/components/pro-table'
import { Button } from 'antd'

export default memo(function () {

    const columns = [
        {
            title: 'id',
            dataIndex:'id'
        },
        {
            title: '活动banner图',
            dataIndex:'pic'
        },
        {
            title: '跳转链接',
            dataIndex:'pic'
        },
        {
            title: 'banner来源',
            dataIndex:''
        },
        {
            title: '投放状态',
            dataIndex:'status_msg'
        },
        {
            title: '操作',
            dataIndex:'',
            render:()=> <Button type="link">编辑</Button>
        },
    ]

    return (
        <div>
            <ProTable title="banner管理" url="banner/list" columns={columns} rowKey="id"/>
        </div>
    )
})
