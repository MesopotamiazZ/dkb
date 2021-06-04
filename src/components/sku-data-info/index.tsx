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

interface singleDataProps {
  price?: number | string;
  stock?: number;
  weight?: number;
  skuCode?: string;
  barCode?: string;
  value?: any;
  sku_code?: string;
  bar_code?: string;
}

interface skuDataInfoProps {
  type: string | number; // 规格性质
  onSetSingleData: (data: any) => void;
  onSetSpecsTableData: (data: any) => void;
  onSetSpecsInfo: (data: any) => void;
  onSpecsRefresh: () => void;
  detail?: any; // 规格详情
  selectCheck?: any; // 选中规格值
  // hasSelects?: any; // 批量设置可选项
  specImgs?: any; // 规格图片
  defaultSingleData?: Array<singleDataProps> | undefined; // 默认编辑单规格数据
  defaultMuchData?: Array<singleDataProps> | undefined; // 默认编辑多规格数据
}
const arr = ['price', 'stock', 'weight', 'skuCode', 'barCode', 'reveal', 'id'];

const SkuDataInfo: React.FC<skuDataInfoProps> = memo((props) => {
  const {
    type,
    detail,
    defaultSingleData,
    defaultMuchData,
    selectCheck,
    specImgs,
    // hasSelects,
    onSetSingleData,
    onSetSpecsTableData,
    onSetSpecsInfo,
    onSpecsRefresh,
  } = props;
  // console.log('specImgs', specImgs)

  const [singleData, setSingleData] = useState<Array<singleDataProps>>([{
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

  // useEffect(() => {
  //   console.log('setspecsSelect', hasSelects)
  //   if (hasSelects.length) {
  //     setspecsSelect(hasSelects);
  //   }
  // }, [hasSelects])

  // useEffect(() => {
  //   if (specImgs.length) {

  //   }
  // }, [specImgs])

  useEffect(() => {
    if (defaultSingleData?.length) {
      setSingleData(defaultSingleData.map((data) => ({
        ...data,
        skuCode: data.sku_code,
        barCode: data.bar_code
      })));
    }
  }, [defaultSingleData])

  /**
   * 编辑赋值多规格列表数据
   */
  useEffect(() => {
    if (defaultMuchData?.length) {
      // console.log(111, defaultMuchData, 2222, specImgs)
      setSpecsTableData(defaultMuchData.map((data) => {
        let obj = {};
        let newObj = {};
        for (let key in data.value) {
          // console.log(key, data[key])
          if (!obj[key]) {
            obj[key] = [data.value[key]];
          }
          if (obj[key] && obj[key].indexOf(data.value[key]) === -1) {
            obj[key].push(data.value[key]);
          }
        }
        let keysSorted = Object.keys(obj).sort(function (a, b) { return -1 });
        for (let i = 0; i < keysSorted.length; i++) {
          newObj[keysSorted[i]] = obj[keysSorted[i]];
        }
        return ({
          price: Number(data.price),
          stock: data.stock,
          weight: data.weight,
          skuCode: data.sku_code,
          barCode: data.bar_code,
          reveal: Object.keys(specImgs).length ? 2 : 1,
          // specImgs,
          ...newObj
        })
      }));
    }
  }, [defaultMuchData, specImgs])

  // useEffect(() => {
  //   if (selectCheck && Object.keys(selectCheck).length) {

  //   }
  // }, [selectCheck])
  // console.log('selectCheck', selectCheck)

  useEffect(() => {
    onSetSingleData(singleData.map((item) => ({
      ...item,
      price: Number(item.price).toFixed(2),
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
                specsDetail={detail}
                checked={selectCheck}
                onSetSpecs={onSetSpecs}
                onRefresh={onSpecsRefresh}
              />
              <BatChSetWrap
                dataSource={specsSelect}
                // hasSelects={hasSelects}
                onSetBatchData={onSetBatchData}
              />
              {
                !!specsTableData.length && <SpecsTable
                  specsTableData={specsTableData}
                  // specImgs={specImgs}
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