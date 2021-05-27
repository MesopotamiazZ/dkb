import React, { memo, useEffect, useState } from 'react';
import {
  Table,
  InputNumber,
  Input
} from 'antd';
import SpecsCheckboxWrap from './components/specsCheckboxWrap';
import BatChSetWrap from './components/batchSetWrap';
import SpecsTable from './components/specsTable';
import './style.less';

interface skuDataInfoProps {
  type: string | number;
  onSetSingleData: (data: any) => void;
  onSetSpecsTableData: (data: any) => void;
  onSetSpecsInfo: (data: any) => void;
  detail?: any;
}
const arr = ['price', 'stock', 'weight', 'skuCode', 'barCode', 'reveal', 'id'];

const SkuDataInfo: React.FC<skuDataInfoProps> = memo((props) => {
  const {
    type,
    detail,
    onSetSingleData,
    onSetSpecsTableData,
    onSetSpecsInfo,
  } = props;
  // console.log('detail', detail)

  const [singleData, setSingleData] = useState([{
    price: 0,
    stock: 0,
    weight: 0,
    skuCode: '',
    barCode: '',
    value: ''
  }])
  const [specsSelect, setspecsSelect] = useState(
    // [
    //   {
    //     id: 1,
    //     name: '配色',
    //     reveal: 2,
    //     value: '黑色,白色,黄色,卡其色',
    //     search: true,
    //     sort: 100,
    //     selects: ['黑色', '黄色']
    //   },
    //   {
    //     id: 2,
    //     name: '尺码',
    //     reveal: 1,
    //     value: '34,35,36,37,38,39,40',
    //     search: true,
    //     sort: 100,
    //     selects: ['34', '35']
    //   },
    // ]
  ); // specs数据包括selects数据
  const [specsTableData, setSpecsTableData] = useState([]);

  useEffect(() => {
    onSetSingleData(singleData.map((item) => ({
      ...item,
      price: item.price.toFixed(2),
    })));
  }, [singleData])

  /**
   * 返回选择后的规格模板详情.spec
   * "spec": [
            {
                "id": 1,
                "name": "配色",
                "reveal": 2,
                "value": "黑色,白色,黄色,卡其色",
                "search": true,
                "sort": 100,
                "selects": ['黑色']
            },
            {
                "id": 2,
                "name": "尺码",
                "reveal": 1,
                "value": "34,35,36,37,38,39,40",
                "search": true,
                "sort": 100
            }
        ]
   */
  const onSetSpecs = (data) => {
    setspecsSelect(data);
  }

  const onSetBatchData = (data) => {
    // console.log('result', data);
    const result = {
      ...data,
      price: data.price || 0,
      stock: data.stock || 0,
      weight: data.weight || 0,
      skuCode: data.skuCode || '',
      barCode: data.barCode || '',
    };
    let otherObj = {};
    let flag = true;

    for (let key in result) {
      if (arr.indexOf(key) === -1) {
        otherObj[`${key}`] = result[key];
      }
    }
    for (let i = 0; i < specsTableData.length; i++) {
      let { price, stock, weight, skuCode, barCode, reveal, id, ...restProps } = specsTableData[i];
      // console.log(JSON.stringify(restProps), JSON.stringify(otherObj))
      if (JSON.stringify(restProps) === JSON.stringify(otherObj)) {
        flag = false
      }
    }
    if (!flag) {
      return
    }
    // console.log('otherKeys', otherObj, specsTableData);
    let tableDataClone = JSON.parse(JSON.stringify(specsTableData));
    // console.log('tableDataClone', tableDataClone);
    tableDataClone.push(Object.assign(result, { id: Date.now() }));
    setSpecsTableData(tableDataClone);
  }

  const singleColumns = [
    {
      title: '价格(元)',
      dataIndex: 'price',
      align: 'center' as 'center',
      render: (text) => {
        return (
          <InputNumber
            value={Number(text) || 0}
            onChange={(val) => {
              const dataClone = JSON.parse(JSON.stringify(singleData));
              dataClone[0].price = val;
              setSingleData(dataClone);
            }}
          />
        )
      },
    },
    {
      title: '库存(件)',
      dataIndex: 'stock',
      align: 'center' as 'center',
      render: (text) => (
        <InputNumber
          value={Number(text) || 0}
          onChange={(val) => {
            const dataClone = JSON.parse(JSON.stringify(singleData));
            dataClone[0].stock = val;
            setSingleData(dataClone);
          }}
        />
      ),
    },
    {
      title: '重量(Kg)',
      dataIndex: 'weight',
      align: 'center' as 'center',
      render: (text) => (
        <InputNumber
          value={Number(text) || 0}
          onChange={(val) => {
            const dataClone = JSON.parse(JSON.stringify(singleData));
            dataClone[0].weight = val;
            setSingleData(dataClone);
          }}
        />
      ),
    },
    {
      title: '规格编码',
      dataIndex: 'skuCode',
      align: 'center' as 'center',
      render: (text) => {
        return (
          <Input
            value={text}
            onChange={(e) => {
              const dataClone = JSON.parse(JSON.stringify(singleData));
              dataClone[0].skuCode = e.target.value;
              setSingleData(dataClone);
            }}
          />
        )
      },
    },
    {
      title: '规格条形码',
      dataIndex: 'barCode',
      align: 'center' as 'center',
      render: (text) => (
        <Input
          value={text}
          onChange={(e) => {
            const dataClone = JSON.parse(JSON.stringify(singleData));
            dataClone[0].barCode = e.target.value;
            setSingleData(dataClone);
          }}
        />
      ),
    },
  ]

  return (
    <div className="sku-data-info outer-area">
      <div className="sku-data-info-inner">
        {
          `${type}` === '1'
            ? <Table
              className="single-table"
              columns={singleColumns}
              dataSource={singleData}
              pagination={false}
            /> : <div>
              <SpecsCheckboxWrap
                specs={detail?.spec}
                onSetSpecs={onSetSpecs}
              />
              <BatChSetWrap
                dataSource={specsSelect}
                onSetBatchData={onSetBatchData}
              />
              {
                !!specsTableData.length && <SpecsTable
                  specsTableData={specsTableData}
                  onSetSpecsTableData={onSetSpecsTableData}
                  onSetSpecsInfo={onSetSpecsInfo}
                />
              }
            </div>
        }
      </div>
    </div>
  )
})

export default SkuDataInfo;