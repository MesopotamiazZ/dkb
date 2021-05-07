import { ReactElement } from 'react/index'

type commonTyps = string | number | undefined;

interface tabsDataProps {
  // section_name: string | undefined | number,
  // section_id: string | undefined | number,
  label: string,
  status: string | undefined,
  key: commonTyps,
}

export interface Itabs {
  defaultKey: commonTyps, // 当前选中的key
  onChange?: undefined | ((key: commonTyps, value: commonTyps, reqData?: any) => any),
  name: string; // 筛选字段名
  data: Array<tabsDataProps>;
}

export interface dataType {
  key?: string,
  name?: string,
  age?: number,
  address?: string,
}

export interface tableDataType {
  list: Array<dataType>,
  page?: number,
  limit?: number,
  total?: number
}

interface btnsProps {
  text: string;
  antdProps: any; // antd属性
  onClick: () => void;
  formProps: any;
}

export interface tableToolsProps {
  btns?: Array<btnsProps> | undefined;
  onSearch?: (value: string) => void;
  placeholder: string;
  searchBtnText: string;
  filterBtn?: btnsProps | undefined;
}


export interface IdkbTable {
  tabs?: Itabs | undefined; // switch-status-bar配置
  tools: tableToolsProps; // tools配置
  columns: []; // 列表行配置
  preSubmit: (values: any) => any; // 搜索前过滤
  url: string; // 请求地址
  requestData: any; // 自定义请求数据
  row?: undefined; // 是否开启选中
  rowKey: string | (() => string); // 唯一key
  expandable: any;

  expandIconAsCell: any;

  expandIconColumnIndex: any;
    // 刷新
  refresh: boolean;
    
  onRow: any; // 对一行的操作
    // 是否分页
  paginationFlag: boolean;
    // 成功回调
  successCb: (tableData: any, setTableData: any) => void;
    // 重写行选择
  renderCell: () => ReactElement;
}