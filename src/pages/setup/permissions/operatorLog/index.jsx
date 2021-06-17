/**
 * @author tigris
 * @description 操作日志列表页
 */
import React, { useState } from 'react';
import { Form, message } from 'antd';
import { clearAllLog } from '@/services/permissions';
import DkbTable from '@/components/dkb-table';
import DelTipModal from '@/components/delete-tip-modal';
import moment from 'moment';

import './style.less';

const OperactorLog = () => {

  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [delTipModal, setDelTipModal] = useState(false);

  const tools = {
    btns: [
      {
        text: '清空记录',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => {
          setDelTipModal(true);
        }
      },
    ],
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '请输入日志信息',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      formProps: {
        title: '订单筛选',
        form,
        initValue: {},
        formArr: [
          {
            search: [
              {
                wrap: {
                  key: 'op_node',
                  name: 'op_node',
                  label: '选择员工',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'op_node',
                  name: 'op_node',
                  label: '操作节点',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'op_client',
                  name: 'op_client',
                  label: '操作终端',
                  type: 'select'
                },
                props: {
                  placeholder: '全部',
                  enum: [
                    {
                      label: '全部',
                      value: 1
                    },
                  ]
                }
              },
              {
                wrap: {
                  key: 'op_at',
                  name: 'op_at',
                  label: '操作时间',
                  type: 'rangepicker',
                },
                props: {
                  ranges: {
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近7天': [moment().subtract('days', 6), moment()],
                    '近30天': [moment().subtract('days', 29), moment()]
                  }
                }
              },
            ]
          }
        ],
        config: [{
          text: "确认",
          wrap: {
            type: "primary"
          },
          htype: "submit", // submit || reset
          onBtnClick: (value) => {
            console.log("按钮点击的事件222", value);
          }
        },
        {
          text: "取消",
          wrap: {
            //按钮的一些属性配置
          },
          htype: "", // submit || reset
          onBtnClick: (value) => {
            //value 返回的是表单的数据
            // type=submit 按钮有提交功能 会自动数据验证
            // type=reset  重置表单
            // 其余的不用传type值
            console.log("按钮点击的事件111", value);
          }
        }],
      }
    }
  }

  const getBtns = (record) => {
    return [
      {
        key: '1',
        text: '编辑',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '2',
        text: '删除',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '流水号',
      dataIndex: 'id',
      align: 'left',
    },
    {
      title: '操作账号',
      dataIndex: 'op_uphone',
      align: 'left',
    },
    {
      title: '操作节点',
      dataIndex: 'op_node',
      align: 'left',
    },
    {
      title: '操作终端',
      dataIndex: 'op_client',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'op_at',
      render: (text) => {
        if (text) {
          return <span>{moment(text * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
        }
      },
      align: 'left',
    },
    {
      title: '操作内容',
      dataIndex: 'op_detail',
      align: 'right',
      width: '25%'
    },

  ]

  return (
    <div className="operactor-log outer-area">
      <div className="operactor-log-inner bg-white">
        <DkbTable
          // tabs={tabs}
          tools={tools}
          url={
            !keywords
              ? '/Setting/Log/getList'
              : '/Setting/Log/getList/smartSearch'
          }
          requestData={
            !keywords ? {} : { keywords }
          }
          // row
          // renderCell={renderCell}
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          refresh={refresh}
        />
      </div>
      <DelTipModal
        title="清空记录"
        width={282}
        text="确认清空所有操作记录？"
        visible={delTipModal}
        onCancel={() => setDelTipModal(false)}
        onOk={async () => {
          const res = await clearAllLog();
          if (res.code === 200) {
            message.success('清空完成');
            setDelTipModal(false);
            setRefresh(!refresh);
          } else {
            message.warning('清空失败');
          }
        }}
      />
    </div>
  )
}

export default OperactorLog;