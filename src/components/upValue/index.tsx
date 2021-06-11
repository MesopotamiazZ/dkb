import React, { memo, useEffect, useState } from 'react';
import {
  Input,
  Button,
  Modal,
  Alert,
  Table,
  InputNumber,
} from 'antd';
import './style.less';

interface upValuesProps {
  upVal: string | number;
  upRules: Array<any>;
  onChangeUpCondition: (data: any) => void;
}

// modal行数据
const modalLineDatas = [
  {
    id: 0,
    ruleName: '消费金额',
    status: false,
    ruleDetail: [
      {
        type: 'price',
        value: '',
        text: '每消费'
      },
      {
        type: 'int',
        value: '',
        text: '元，获得'
      },
    ],
  },
  {
    id: 1,
    ruleName: '规则详情',
    status: false,
    ruleDetail: [
      {
        type: 'int',
        value: '',
        text: '每完成'
      },
      {
        type: 'int',
        value: '',
        text: '笔订单，获得'
      },
    ],
  }
]

/**
 * 获取条件
 */
const UpValue: React.FC<upValuesProps> = memo(({ upRules, onChangeUpCondition, upVal }) => {

  const [upValue, setUpValue] = useState(upVal);
  const [ruleModal, setRuleModal] = useState(false);
  const [dataSource, setDataSource] = useState(modalLineDatas);
  const [dataSourceTemp, setDataSourceTemp] = useState(null); // 备份
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择项

  /**
   * 初始赋值
   */
  useEffect(() => {
    if (upVal) {
      setUpValue(upVal);
    }
    if (upRules.length) {
      modalLineDatas.forEach((data, index) => {
        upRules.forEach((rule, i) => {
          if (index === i && index === 0) {
            data.ruleDetail[index].value = rule.count;
            data.status = rule.status;
          }
          if (index === i && index === 1) {
            data.ruleDetail[index].value = rule.reward;
            data.status = rule.status;
          }
        })
      })
      setDataSource(modalLineDatas);
    }
  }, [upVal, upRules])

  /**
   * 初始赋值 selectRowKeys
   */
  useEffect(() => {
    const keys = [];
    dataSource.forEach((item, index) => {
      if (item.status) {
        keys.push(index);
      }
    })
    setSelectedRowKeys(keys);
  }, [dataSource])

  useEffect(() => {
    onChangeUpCondition({ upValue, dataSource });
  }, [upValue, dataSource])

  /**
   * 点击确定设置成长规则
   */
  const setRuleFnc = () => {
    setRuleModal(false);
  }

  const columns = [
    {
      title: '规则名称',
      dataIndex: 'ruleName',
      render: (text) => <span>{text}</span>,
      // align: 'left',
      width: 120,
    },
    {
      title: '规则详情',
      render: (record, _, ind) => (
        <div className="rule-detail">
          {
            record.ruleDetail.map((rule, index) => (
              <div key={rule.text}>
                <span>{rule.text}</span>
                {
                  rule.type === 'price'
                    ? <InputNumber
                      value={rule.value}
                      onChange={(value) => {
                        let dataClone = JSON.parse(JSON.stringify(dataSource));
                        dataClone[ind].ruleDetail.forEach((rule, i) => {
                          // console.log(rule, i, index)
                          if (i === index && i === 0) {
                            rule.value = value;
                          }
                          if (i === index && i === 1) {
                            rule.value = value;
                          }
                        })
                        // console.log('dataSource', dataClone)
                        setDataSource(dataClone);
                      }}
                      placeholder="仅支持金额数值"
                    />
                    : <InputNumber
                      placeholder="仅支持整数"
                      value={rule.value}
                      onChange={(value) => {
                        let dataClone = JSON.parse(JSON.stringify(dataSource));
                        dataClone[ind].ruleDetail.forEach((rule, i) => {
                          // console.log(rule, i, index)
                          if (i === index && i === 0) {
                            rule.value = value;
                          }
                          if (i === index && i === 1) {
                            rule.value = value;
                          }
                        })
                        // console.log('dataSource', dataClone)
                        setDataSource(dataClone);
                      }}
                    />
                }
                {
                  index === 1 && <span>成长值</span>
                }
              </div>
            ))
          }
        </div>
      ),
      // align: 'left',
    }
  ]

  /**
   * 可选择
   */
  const rowSelection = {
    selectedRowKeys,
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onChange: (key, records) => {
      // console.log(key, records);
      setSelectedRowKeys(key);
      let dataClone = JSON.parse(JSON.stringify(dataSource));
      if (key.length === 0) {
        dataClone[0].status = false;
        dataClone[1].status = false;
      }
      if (key.length === 1 && key[0] === 0) {
        dataClone[0].status = true;
        dataClone[1].status = false;
      }
      if (key.length === 1 && key[0] === 1) {
        dataClone[0].status = false;
        dataClone[1].status = true;
      }
      if (key.length === 2) {
        dataClone[0].status = true;
        dataClone[1].status = true;
      }
      setDataSource(dataClone);
    },
    // onSelect: (record, selected, selectedRows) => {
    //   setSelectedRowKeys(selectedRows);
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  }

  return (
    <div className="up-value">
      <div className="up-value-main">
        <span>成长值</span>
        <InputNumber
          value={Number(upValue)}
          min={0}
          onChange={(value) => setUpValue(value)}
          placeholder="请输入成长值"
        />
        <Button
          type="link"
          onClick={() => {
            setDataSourceTemp(dataSource);
            setRuleModal(true);
          }}
        >
          设置规则
        </Button>
      </div>
      <div className="up-value-foot">
        更新等级成长值后，部分客户可能因不满足该成长值产生等级变化
      </div>
      <Modal
        className="rule-modal"
        title="成长规则"
        visible={ruleModal}
        destroyOnClose
        width={740}
        onOk={() => setRuleFnc()}
        onCancel={() => {
          setDataSource(dataSourceTemp);
          setRuleModal(false);
        }}
      >
        <Alert
          message="本规则有效范围为所有（自动升级）等级，为共享规则。"
          type="info"
          showIcon
          closable
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          rowSelection={rowSelection}
          pagination={false}
        />
      </Modal>
    </div>
  )
})

export default UpValue;