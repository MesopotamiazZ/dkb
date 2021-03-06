import { ReactElement } from 'react/index'

export interface tableDataType {
    list: Array<dataType>,
    page?: number,
    limit?: number,
    total?: number
}

/**
 * 请求参数
 */
export interface reqType {
    page: number,
    limit: number,
    search?: object,
    // 板块id
    section_id?: string | undefined | number,
    sort?: {
        crate_id: String, s
    }
}

export interface dataType {
    key?: string,
    name?: string,
    age?: number,
    address?: string,
}

interface tabsDataType {
    // section_name: string | undefined | number,
    // section_id: string | undefined | number,
    label: string,
    status: string | undefined,
    key: string | undefined | number,
}

interface tabsItemType {

    defaultKey: string | undefined,

    onChange?: undefined | ((key: string | number | undefined, value: string | number | undefined, reqData: string | number | undefined) => any),

    title?: string,

    // 传给后端的key
    key: string,

    data: Array<tabsDataType>,

    //二级菜单响应式配置
    col?: any,   //响应式配置

    // 二级菜单默认展开
    defaultOpen: boolean,
}

export interface tabsType {

    firstTabs: tabsItemType,
    secondTabs: tabsItemType,

}

/**
 * 工具栏类型
 */
interface toolType {
    title?: string,
    buttons?: () => ReactElement
    render: (selectRows: Array<any>) => ReactElement
}

export interface propsType {
    // 标题
    title: string,

    // 行配置
    columns: [],

    // tabs配置
    tabs: tabsType,

    // 表单配置
    formProps: any,

    // 工具栏配置
    tableTools: {
        title: string,
        actions: Array<toolType>
    },

    // 搜索前过滤
    preSubmit: (values: any) => any

    // 请求地址
    url: string,

    // 自定义请求数据
    requestData: any,

    // 是否开启选中
    row?: undefined,

    // 唯一key
    rowKey: string | (() => string)

    // 刷新
    reset: boolean

    // 板块id
    // section_id: number

    // 展开项
    expandable: any,

    expandIconAsCell: any,

    expandIconColumnIndex: any,
    // 刷新
    refresh: boolean,
    
    onRow: any,
    // 是否分页
    paginationFlag: boolean,
    // 成功回调
    successCb: Function,
    // 重写行选择
    renderCell: Function,
}