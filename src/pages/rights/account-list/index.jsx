import React, { memo } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import ProTable from '@/components/pro-table'

export default memo(function () {

    const history = useHistory()

    /**
     * 编辑账号
     * @param {*} text 
     */
    const handleEdit = text => {
        console.log('text',text);
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'account_id'
        },
        {
            title: '账号',
            dataIndex: 'account'
        },
        {
            title: '用户名',
            dataIndex: 'nickname'
        },
        {
            title: '手机号',
            dataIndex: 'mobile'
        },
        {
            title: '用户组',
            dataIndex: 'group_name'
        },
        {
            title: '用户组 id',
            dataIndex: 'group_id'
        },
        {
            title: '状态',
            dataIndex: 'status_msg'
        },
        {
            title: '创建时间',
            dataIndex: 'create_at',
            render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text) => <Button type="link" onClick={() => handleEdit(text)}>编辑</Button>
        },

    ]

    const formProps = {
        search: [
            {
                wrap: {
                    key: 'account',
                    name: 'account',
                    label: '用户账号',
                    type: 'input',
                },
                props: {
                    placeholder: '请输入用户账号',
                }
            },
            {
                wrap: {
                    key: 'mobile',
                    name: 'mobile',
                    label: '手机号',
                    type: 'input',
                },
                props: {
                    placeholder: '请输入用户手机号',
                }
            },
            {
                wrap: {
                    key: 'group_id',
                    name: 'group_id',
                    label: '用户组id',
                    type: 'input',
                },
                props: {
                    placeholder: '请输入用户组id',
                }
            },
            {
                wrap: {
                    key: 'search',
                    name: 'search',
                    label: '用户名',
                    type: 'input',
                },
                props: {
                    placeholder: '请输入用户名进行模糊搜索',
                }
            },
        ]
    }

    // 表格工具
    const tableTools = {
        title: '',
        actions: [
            {
                render: () => {
                    return <Button type="link" onClick={() => history.push('/rights/account-list/create')}>创建账号</Button>
                }
            }
        ]
    }

    return (
        <div>
            <ProTable
                url="account/list"
                title="账号列表"
                columns={columns}
                rowKey="account_id"
                formProps={formProps}
                tableTools={tableTools}
            />
        </div>
    )
})
