// import { createRouters } from '@/utils/utils';

// const files = require.context('@/pages', true, /index\.jsx/);
// export default createRouters(files);

const routers = () => {
    return [
        {
            path: "/overview",
            key: "/overview",
            title: '概览',
            icon: 'HomeOutlined',
            componentPath: "pages/overview",
            exact: true,
        },
        {
            path: "/order",
            key: "/order",
            title: '订单',
            icon: 'HomeOutlined',
            componentPath: "",
            exact: true,
            children: [
                {
                    path: "/order/order-manage",
                    key: "/order/order-manage",
                    title: '订单管理',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/order/order-manage/list",
                            key: "/order/order-manage/list",
                            title: '订单列表',
                            icon: 'HomeOutlined',
                            componentPath: "pages/order/order-manage/orderManageList",
                            exact: true,
                        },
                        {
                            path: "/order/order-manage/evaluation",
                            key: "/order/order-manage/evaluation",
                            title: '订单评价',
                            icon: 'HomeOutlined',
                            componentPath: "pages/order/order-manage/orderEvaluation",
                            exact: true,
                        },
                        {
                            path: "/order/order-manage/batch-ship",
                            key: "/order/order-manage/batch-ship",
                            title: '批量发货',
                            icon: 'HomeOutlined',
                            componentPath: "pages/order/order-manage/batchShip",
                            exact: true,
                        },
                    ]
                },
                {
                    path: "/order/after-sales-manage",
                    key: "/order/after-sales-manage",
                    title: '售后管理',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/order/after-sales-manage/after-sales-order",
                            key: "/order/after-sales-manage/after-sales-order",
                            title: '订单售后',
                            icon: 'HomeOutlined',
                            componentPath: "pages/order/after-sales-manage/afterSalesOrder",
                            exact: true,
                        },
                        {
                            path: "/order/after-sales-manage/complain-order",
                            key: "/order/after-sales-manage/complain-order",
                            title: '订单投诉',
                            icon: 'HomeOutlined',
                            componentPath: "pages/order/after-sales-manage/complainOrder",
                            exact: true,
                        },
                    ]
                },
                {
                    path: "/order/payment-detail",
                    key: "/order/payment-detail",
                    title: '收款明细',
                    icon: 'HomeOutlined',
                    componentPath: "pages/order/paymentDetail",
                    exact: true,
                    borderTop: true,
                },
                {
                    // path: "/order/dispatch-manage",
                    redirectPath: '/setup/base',
                    key: "/order/dispatch-manage",
                    title: '配送管理',
                    icon: 'HomeOutlined',
                    exact: true,
                },
            ]
        },
        {
            path: "/product",
            key: "/product",
            title: '商品',
            icon: 'HomeOutlined',
            componentPath: "",
            exact: true,
            children: [
                {
                    path: "/product/product-manage",
                    key: "/product/product-manage",
                    title: '商品管理',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/product/product-manage/list",
                            key: "/product/product-manage/list",
                            title: '商品列表',
                            icon: 'HomeOutlined',
                            componentPath: "pages/product/product-manage/productManageList",
                            exact: true,
                        },
                        {
                            path: "/product/product-manage/classification",
                            key: "/product/product-manage/classification",
                            title: '商品分类',
                            icon: 'HomeOutlined',
                            componentPath: "pages/product/product-manage/classification",
                            exact: true,
                        },
                        {
                            path: "/product/product-manage/specTemplate",
                            key: "/product/product-manage/specTemplate",
                            title: '规格模板',
                            icon: 'HomeOutlined',
                            componentPath: "pages/product/product-manage/specTemplate",
                            exact: true,
                        },
                    ]
                },
                {
                    path: "/product/product-tools",
                    key: "/product/product-tools",
                    title: '商品工具',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/product/product-tools/batchModifyPrice",
                            key: "/product/product-tools/batchModifyPrice",
                            title: '批量改价',
                            icon: 'HomeOutlined',
                            componentPath: "pages/product/product-tools/batchModifyPrice",
                            exact: true,
                        },
                        {
                            path: "/product/product-tools/batchReplace",
                            key: "/product/product-tools/batchReplace",
                            title: '批量替换',
                            icon: 'HomeOutlined',
                            componentPath: "pages/product/product-tools/batchReplace",
                            exact: true,
                        },
                    ]
                }
            ]
        },
        {
            path: "/customer",
            key: "/customer",
            title: '客户',
            icon: 'HomeOutlined',
            componentPath: "",
            exact: true,
            children: [
                {
                    path: "/customer/customer-manage",
                    key: "/customer/customer-manage",
                    title: '客户管理',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/customer/customer-manage/all",
                            key: "/customer/customer-manage/all",
                            title: '全部客户',
                            icon: 'HomeOutlined',
                            componentPath: "pages/customer/customer-manage/allCustomer",
                            exact: true,
                        },
                        {
                            path: "/customer/customer-manage/level",
                            key: "/customer/customer-manage/level",
                            title: '客户等级',
                            icon: 'HomeOutlined',
                            componentPath: "pages/customer/customer-manage/customerLevel",
                            exact: true,
                        },
                        {
                            path: "/customer/customer-manage/tag",
                            key: "/customer/customer-manage/tag",
                            title: '标签管理',
                            icon: 'HomeOutlined',
                            componentPath: "pages/customer/customer-manage/tagManage",
                            exact: true,
                        },
                    ]
                },
                {
                    path: "/customer/customer-storage",
                    key: "/customer/customer-storage",
                    title: '客户储值',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/customer/customer-storage/rule",
                            key: "/customer/customer-storage/rule",
                            title: '客户规则',
                            icon: 'HomeOutlined',
                            componentPath: "pages/customer/customer-storage/storageRule",
                            exact: true,
                        },
                        {
                            path: "/customer/customer-storage/storage-manage",
                            key: "/customer/customer-storage/storage-manage",
                            title: '储值管理',
                            icon: 'HomeOutlined',
                            componentPath: "pages/customer/customer-storage/storageManage",
                            exact: true,
                        },
                    ]
                },
            ]
        },
        {
            path: "/setup",
            key: "/setup",
            title: '设置',
            icon: 'HomeOutlined',
            componentPath: "",
            exact: true,
            children: [
                {
                    path: "/setup/base",
                    key: "/setup/base",
                    title: '基本设置',
                    icon: 'HomeOutlined',
                    componentPath: "pages/setup/base",
                    exact: true,
                },
                {
                    path: "/setup/system",
                    key: "/setup/system",
                    title: '系统设置',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/setup/system/delivery",
                            key: "/setup/system/delivery",
                            title: '配送设置',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/system/delivery",
                            exact: true,
                        },
                        {
                            path: "/setup/system/pay",
                            key: "/setup/system/pay",
                            title: '支付设置',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/system/paySet",
                            exact: true,
                        },
                        {
                            path: "/setup/system/add-edit-express",
                            key: "/setup/system/pay",
                            title: '新建运费模板',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/system/addExpress",
                            exact: true,
                            hidden: true,
                        },
                        {
                            path: "/setup/system/add-edit-store",
                            key: "/setup/system/pay",
                            title: '新建门店',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/system/addStore",
                            exact: true,
                            hidden: true,
                        },
                        {
                            path: "/setup/system/add-edit-address",
                            key: "/setup/system/pay",
                            title: '新建地址',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/system/addAddress",
                            exact: true,
                            hidden: true,
                        },
                    ]
                },
                {
                    path: "/setup/permissions",
                    key: "/setup/permissions",
                    title: '账号权限',
                    icon: 'HomeOutlined',
                    componentPath: "",
                    exact: true,
                    children: [
                        {
                            path: "/setup/permissions/staffManage",
                            key: "/setup/permissions/staff",
                            title: '员工管理',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/permissions/staffManage",
                            exact: true,
                        },
                        {
                            path: "/setup/permissions/staffRole",
                            key: "/setup/permissions/staff",
                            title: '员工角色',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/permissions/staffRole",
                            exact: true,
                        },
                        {
                            path: "/setup/permissions/operatorLog",
                            key: "/setup/permissions/operatorLog",
                            title: '操作日志',
                            icon: 'HomeOutlined',
                            componentPath: "pages/setup/permissions/operatorLog",
                            exact: true,
                        },
                    ]
                },
            ]
        },
    ]
}

export default routers()


/**
 * 路由表结构
    path: "/home",  // 路由path
    key: "/home",   // 服务器中的key、此处项目设计时未做好设计，因此前端key和后端key不一致，此key用来tree树形菜单选中
    title: '首页',   // tree树形菜单中的title
    icon: 'HomeOutlined', //左侧导航菜单中的icon
    componentPath: "pages/home/statistics", //组件的path路径
    exact: true,    // 是否精准匹配路由
    children:[      // 二级导航
        {
            path: '/home/promotion',
            key: '/home/promotion',
            disabled: true,     // 不可取消勾选
            permanent: true,    // 默认菜单，常驻
            title: '我的推广',
            icon: 'RiseOutlined',
            componentPath: 'pages/home/promotion'
        }
    ]
 */

