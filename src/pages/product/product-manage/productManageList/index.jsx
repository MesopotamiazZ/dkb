/**
 * @author tigris
 * @description 商品列表页面
 */
import React, { useState } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import DkbTable from '@/components/dkb-table';
import RenderTitle from '@/components/renderTitle';
import RenderStatus from '@/components/renderStatus';
import RenderAction from '@/components/renderAction';
import moment from 'moment';
import { parseFilterValue } from '@/utils';
import './style.less';
import Avatar from 'antd/lib/avatar/avatar';

const statusEnum = {
  '1': {
    name: '出售中',
    color: '#52c41a',
  },
  '2': {
    name: '已售罄',
    color: '#ff4d4f',
  },
  '3': {
    name: '已下架',
    color: '#ff4d4f',
  },
  '4': {
    name: '回收站',
    color: '#d9d9d9',
  },
  '100': {
    name: '库存预警',
    color: '#fff000',
  },
}

const ProductManageList = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [filterObj, setFilterObj] = useState({});
  const [defaultSales, setDefaultSales] = useState([]);
  // const [salesNumbers, setSalesNumbers] = useState([]);
  const [defaultPrice, setDefaultPrice] = useState([]);
  // const [priceNumbers, setPriceNumbers] = useState([]);

  const tabs = {
    defaultKey: 0,
    name: 'goods_status',
    onChange: (key, value, reqValue) => {
      return ''
    },
    data: [
      {
        label: "全部商品",
        key: 0,
      },
      {
        label: "出售中",
        key: 1,
      },
      {
        label: "已售罄",
        key: 2,
      },
      {
        label: "已下架",
        key: 3,
      },
      {
        label: "库存预警",
        key: 100,
      },
      {
        label: "回收站",
        key: 4,
      },
    ]
  }

  const tools = {
    btns: [
      {
        text: '发布商品',
        antdProps: {
          type: 'primary',
        },
        onClick: () => {
          history.push({
            pathname: '/product/product-manage/publish-product'
          })
        }
      },
      {
        text: '批量删除',
        antdProps: {
          type: 'primary',
          danger: true
        },
        onClick: () => { }
      },
    ],
    onSearch: (val) => {
      setKeywords(val);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 0)
    },
    placeholder: '支持商品、收件人信息等模糊搜索',
    searchBtnText: '搜索',
    filterBtn: {
      text: '筛选',
      antdProps: {
      },
      formProps: {
        title: '商品筛选',
        form,
        initValue: {},
        formArr: [
          {
            search: [
              {
                wrap: {
                  key: 'goods_title',
                  name: 'goods_title',
                  label: '商品名称',
                  type: 'input'
                },
                props: {
                  style: { width: '100%' },
                  placeholder: '请输入商品名称',
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'goods_class',
                  name: 'goods_class',
                  label: '商品分类',
                  type: 'select'
                },
                props: {
                  placeholder: '请选择商品分类',
                  enum: []
                }
              },
              {
                col: 12,
                wrap: {
                  key: 'goods_status',
                  name: 'goods_status',
                  label: '商品状态',
                  type: 'select'
                },
                props: {
                  placeholder: '请选择商品分类',
                  enum: [
                    {
                      label: '全部',
                      value: 0
                    },
                    {
                      label: '出售中',
                      value: 1
                    },
                    {
                      label: '已售罄',
                      value: 2
                    },
                    {
                      label: '已下架',
                      value: 3
                    },
                    {
                      label: '回收站',
                      value: 4
                    },
                  ]
                }
              },
              {
                wrap: {
                  key: 'sales',
                  name: 'sales',
                  label: '商品销量',
                  type: 'inputgroupnumber'
                },
                props: {
                  // placeholder: '请选择商品分类',
                  numbers: defaultSales,
                  onChange: ([statr, end]) => {
                    console.log(statr, end);
                    // setSalesNumbers([statr, end]);
                  }
                }
              },
              {
                wrap: {
                  key: 'price',
                  name: 'price',
                  label: '商品价格',
                  type: 'inputgroupnumber'
                },
                props: {
                  // placeholder: '请选择商品分类',
                  numbers: defaultPrice,
                  onChange: ([statr, end]) => {
                    console.log(statr, end)
                    // setPriceNumbers([statr, end]);
                  }
                }
              },
            ],
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
            const obj = parseFilterValue(value);
            const { sales, price, ...restProps } = obj;
            setFilterObj(Object.assign(
              restProps,
              { start_salenum: value?.sales ? value?.sales[0] : null },
              { end_salenum: value?.sales ? value?.sales[1] : null },
              { start_price: value?.price ? value?.price[0] : null },
              { end_price: value?.price ? value?.price[1] : null },
            ));
            setTimeout(() => {
              setRefresh(!refresh);
            }, []);
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
            setFilterObj({});
            form.resetFields();
            setDefaultSales([]);
            setDefaultPrice([]);
            setTimeout(() => {
              setRefresh(!refresh);
            }, []);
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
        onActionClick: () => {
          history.push({
            pathname: '/product/product-manage/publish-product',
            state: {
              id: record.id
            }
          });
        },
      },
      {
        key: '2',
        text: '下架',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '3',
        text: '推广',
        type: 'link',
        onActionClick: () => { },
      },
      {
        key: '4',
        text: '更多',
        type: 'link',
        onActionClick: () => { },
      },
    ]
  }

  const columns = [
    {
      title: '缩略图',
      render: (record) => (
        <Avatar src={record.thumb} size={80} shape="square" />
      ),
      align: 'left',
    },
    {
      title: '商品名称/编号/分类',
      render: (record) => (
        <RenderTitle
          mainTitle={record?.title}
          subTitle={[
            `${record.id}`,
            `${record.classInfo.map((item) => (item.name)).join('/')}`
          ]}
          titleStyle={{ alignItems: 'left' }}
        />
      ),
      width: '25%',
      align: 'left',
    },
    {
      title: '价格(元)',
      // dataIndex: '',
      render: (record) => {
        if (record.price_low !== record.price_high) {
          return <div>
            <div>最低价：￥{record.price_low}</div>
            <div>最高价：￥{record.price_high}</div>
          </div>
        } else {
          return <span>￥{record.price_low}</span>
        }
      },
      align: 'left',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      align: 'left',
    },
    {
      title: '销量',
      dataIndex: 'salenum',
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: (text) => moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
      align: 'left'
    },
    {
      title: '状态',
      render: (record) => (
        <RenderStatus
          type="circle"
          color={statusEnum[record.status]?.color}
          badge_text={statusEnum[record.status]?.name}
        />
      ),
      align: 'left',
    },
    {
      title: '操作',
      render: (record) => (
        <RenderAction
          record={record}
          type="row"
          getBtns={() => getBtns(record)}
        />
      ),
      align: 'center',
      fixed: 'right'
    }
  ]

  return (
    <div className="product-manage-list outer-area">
      <div className="product-manage-list-inner bg-white">
        <DkbTable
          tabs={tabs}
          tools={tools}
          refresh={refresh}
          url={
            !keywords
              ? '/Goods/MdseManage/getList'
              : '/Goods/MdseManage/getList/smartSearch'
          }
          row
          // renderCell={renderCell}
          requestData={
            !keywords ? Object.assign({}, filterObj)
              : Object.assign({ keywords }, filterObj)
          }
          columns={columns}
          rowKey="id"
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </div>
    </div>
  )
}

export default ProductManageList;