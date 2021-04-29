import React, { memo } from 'react'
import ProTable from '@/components/pro-table'
import moment from 'moment'
import { Button } from 'antd'

//TODO: 此处用户组搜索服务端无返回值
export default memo(function () {

    /**
     * 编辑权限
     * @param {*} text 
     */
    const handleEdit = (text) => {
        console.log('handleEdit',text);
        
    }

    const columns = [
        {
            title: '用户组 id',
            dataIndex: 'group_id'
        },
        {
            title: '用户组名称',
            dataIndex: 'group_name'
        },

        {
            title: '创建时间',
            dataIndex: 'create_at',
            render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text) => <Button type="link" onClick={() => handleEdit(text)}>编辑</Button>,
        },

    ]

    const formProps = {
        search: [
            {
                wrap: {
                    key: 'group_name',
                    name: 'group_name',
                    label: '权限组名称',
                    type: 'input',
                },
                props: {
                    placeholder: '请输入权限组名称',
                }
            },
        ]
    }

    return (
        <div>
            <ProTable
                url="account/group/list"
                title="权限列表"
                columns={columns}
                rowKey="group_id"
                formProps={formProps}
            />
        </div>
    )
})
