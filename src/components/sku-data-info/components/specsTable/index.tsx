import React, { memo, useCallback, useEffect, useState } from 'react';
import { Table, InputNumber, Input } from 'antd';
import ProUpload from '../../../pro-upload';
import { baseUrl } from '../../../../utils/upload';
import './style.less';

interface specsTableProps {
  specsTableData: any;
  onSetSpecsTableData: (data: any) => void;
  onSetSpecsInfo: (info: any, data: any) => void;
}

const arr = ['price', 'stock', 'weight', 'skuCode', 'barCode', 'reveal', 'id'];

const SpecsTable: React.FC<specsTableProps> = memo((props) => {
  const {
    specsTableData,
    onSetSpecsTableData, // 返回基础表格数据
    onSetSpecsInfo, // 返回规格类型
  } = props;

  const [flag, setFlag] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [specsInfo, setSpecsInfo] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setTableData(specsTableData);
  }, [specsTableData])

  // useEffect(() => {
  //   console.log('specsInfo', specsInfo, flag);
  //   onSetSpecsInfo(specsInfo, JSON.parse(JSON.stringify(specsTableData)));
  // }, [flag, specsInfo])

  const parseDefaultList = useCallback((tableData: any, key: string, index: number) => {
    // console.log('specsInfo', specsInfo, tableData);
    if (Object.keys(specsInfo).length && specsInfo[`${key}`] && tableData[index] && specsInfo[`${key}`][`${tableData[index][key]}`]) {
      // console.log(specsInfo[`${key}`][`${tableData[index][key]}`]);
      return [
        {
          path: specsInfo[`${key}`][`${tableData[index][key]}`].split('.com')[1],
          is_cover: 0
        }
      ]
    } else {
      return []
    }

  }, [specsInfo, tableData])

  useEffect(() => {
    const data = tableData[0];
    if (data) {
      const otherColumns = [];
      let count = 0;
      let dataIndexs;
      for (let key in data) {
        dataIndexs = specsTableColumns.map((item) => {
          return item.dataIndex
        })
        if (arr.indexOf(key) === -1 && dataIndexs.indexOf(key) === -1) {
          // console.log(key, data[key])
          otherColumns.push({
            title: key,
            dataIndex: key,
            align: 'center' as 'center',
            width: 90,
          })
          if (data.reveal === 2 && count === 0) {
            // console.log(key, data[key])
            ++count
            otherColumns.push({
              title: '规格图片',
              align: 'center' as 'center',
              width: 90,
              render: (record, _, index) => {
                return (
                  columns.length > 0 && <ProUpload
                    imageParams={{}}
                    actionUrl={baseUrl}
                    imgUrl={baseUrl}
                    is_only={1}
                    accept='.png,.jpg,.jpeg,.svg'
                    defaultList={parseDefaultList(tableData, key, index)}
                    // defaultList={[]}
                    onChange={(pics) => {
                      // console.log('result', baseUrl + pics[0]?.path, key, tableData[index][key]);
                      let specsInfoClone = Object.assign(specsInfo);
                      if (specsInfoClone[`${key}`] && Object.keys(specsInfoClone[`${key}`]).length > 0) {
                        specsInfoClone[`${key}`][`${tableData[index][key]}`] = baseUrl + pics[0]?.path;
                      } else {
                        specsInfoClone[`${key}`] = {
                          [`${tableData[index][key]}`]: baseUrl + pics[0]?.path
                        }
                      }
                      console.log('specsInfoClone', specsInfoClone)
                      setSpecsInfo(specsInfoClone);

                      setTimeout(() => {
                        // console.log(11111, !flag)
                        // setFlag(!flag);
                        // console.log(1112, specsInfo);
                        // let infoClone = JSON.parse(JSON.stringify(specsInfo));
                        // let obj = {};
                        // for (let i = 0; i < specsTableData.length; i++) {
                        //   let { price, stock, weight, skuCode, barCode, reveal, id, ...restProps } = tableData[i];
                        //   for (let key in restProps) {
                        //     if (obj[`${key}`]) {
                        //       obj[`${key}`].push(restProps[`${key}`]);
                        //     } else {
                        //       obj[`${key}`] = [restProps[`${key}`]];
                        //     }
                        //   }
                        // }
                        // const newObj = Object.assign(obj, infoClone);
                        // console.log('newObj', newObj, infoClone, obj)
                        onSetSpecsInfo(specsInfo, JSON.parse(JSON.stringify(specsTableData)));
                      }, 100)

                      // let tableDataClone = JSON.parse(JSON.stringify(tableData));
                      // tableDataClone[index].img = pics[0]?.path;
                      // setTableData(tableDataClone);
                    }}
                  />
                )
              }
            })
          }
        }
      }
      const columns = otherColumns.concat(specsTableColumns);
      setColumns(columns);
    }
  }, [tableData])

  useEffect(() => {
    console.log(tableData)
    onSetSpecsTableData(tableData);
  }, [tableData])

  const specsTableColumns = [
    // {
    //   title: '规格图片',
    //   align: 'center' as 'center',
    //   width: 90,
    //   render: (record, _, index) => {
    //     return (
    //       columns.length > 0 && <ProUpload
    //         imageParams={{}}
    //         actionUrl={baseUrl}
    //         imgUrl={baseUrl}
    //         is_only={1}
    //         accept='.png,.jpg,.jpeg,.svg'
    //         defaultList={[]}
    //         onChange={(pics) => {
    //           console.log('result', baseUrl + pics[0]?.path, record, columns, index);
    //           let dataClone = JSON.parse(JSON.stringify(tableData));
    //           dataClone[index].img = pics[0]?.path;
    //           // setTableData(dataClone);
    //         }}
    //       />
    //     )
    //   }
    // },
    {
      title: '价格(元)',
      dataIndex: 'price',
      align: 'center' as 'center',
      render: (text, row, index) => {
        return (
          <InputNumber
            value={Number(text) || 0}
            onChange={(val) => {
              let dataClone = JSON.parse(JSON.stringify(tableData));
              dataClone[index].price = val;
              setTableData(dataClone);
            }}
          />
        )
      },
    },
    {
      title: '库存(件)',
      dataIndex: 'stock',
      align: 'center' as 'center',
      render: (text, row, index) => (
        <InputNumber
          value={Number(text) || 0}
          onChange={(val) => {
            let dataClone = JSON.parse(JSON.stringify(tableData));
            dataClone[index].stock = val;
            setTableData(dataClone);
          }}
        />
      ),
    },
    {
      title: '重量(Kg)',
      dataIndex: 'weight',
      align: 'center' as 'center',
      render: (text, row, index) => (
        <InputNumber
          value={Number(text) || 0}
          onChange={(val) => {
            let dataClone = JSON.parse(JSON.stringify(tableData));
            dataClone[index].weight = val;
            setTableData(dataClone);
          }}
        />
      ),
    },
    {
      title: '规格编码',
      dataIndex: 'skuCode',
      align: 'center' as 'center',
      render: (text, row, index) => {
        return (
          <Input
            value={text}
            onChange={(e) => {
              let dataClone = JSON.parse(JSON.stringify(tableData));
              dataClone[index].skuCode = e.target.value;
              setTableData(dataClone);
            }}
          />
        )
      },
    },
    {
      title: '规格条形码',
      dataIndex: 'barCode',
      align: 'center' as 'center',
      render: (text, row, index) => (
        <Input
          value={text}
          onChange={(e) => {
            let dataClone = JSON.parse(JSON.stringify(tableData));
            dataClone[index].barCode = e.target.value;
            setTableData(dataClone);
          }}
        />
      ),
    },
  ];

  return (
    <div className="specs-table">
      {
        columns.length > 0 && <Table
          // columns={specsTableColumns}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          rowKey="id"
        />
      }
    </div>
  )
})

export default SpecsTable;

// render: (value, row, index) => {
        //   const obj: any = {
        //     children: value,
        //     props: {},
        //   };
        //   if (objArr.map((item) => (item?.value)).indexOf(value) === -1) {
        //     // return {
        //     //   value,
        //     //   index,
        //     //   count: 1
        //     // }
        //     objArr.concat({
        //       value,
        //       indexs: index.push(),
        //     })
        //   } else {

        //   }
        //   // if (index === 0) {
        //   //   obj.props.rowSpan = 2;
        //   // }
        //   // // // These two are merged into above cell
        //   // if (index === 1) {
        //   //   obj.props.rowSpan = 0;
        //   // }
        //   return obj;
        // }