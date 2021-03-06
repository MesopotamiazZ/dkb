import React, { memo, useEffect, useCallback, useRef, useState } from 'react';
import { Table, message } from 'antd';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import request from '../../services/request';
import { IdkbTable } from './type';
import SwitchStatusBar from './components/switch-status-bar';
import TableOperatorTools from './components/table-operator-tools';
import './style.less';

function onTableChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const DkbTable: React.FC<IdkbTable> = memo((props) => {
  const {
    tabs,
    tools,
    url, // 列表请求地址
    requestData, // 请求所带参数
    paginationFlag = true, // 是否需要分页
    rowKey,
    expandable = false,
    expandIconAsCell = false,
    expandIconColumnIndex = -1,
    refresh = false,
    onRow,
    successCb = () => { },
    renderCell = false,
    components,
    drag,
  } = props;

  // const {
  //   onChange,
  //   ...restProps
  // } = tabs;

  const tableDataDefault = paginationFlag ? { // 默认列表返回格式
    list: [],
    page: 1,
    limit: 10,
    total: 0,
  } : {
    list: []
  }

  const reqDataDefault = paginationFlag ? {  // 默认请求参数
    page: 1,
    limit: 10,
    // search: {},
    // sort: {},
  } : {
    // search: {},
    // sort: {},
  }

  const tabsReqInit: null | any = useRef(null);
  const tabsReqFlag: null | any = useRef(false);

  const [tableData, setTableData] = useState(tableDataDefault)                    // 表格数据
  const [selectRows, setSelectRows] = useState([]);                               // 被选中的行数据对象数组
  const [selectRowKeys, setSelectRowKeys] = useState([]);                         // 被选中行的keys
  const [reqData, setReqData] = useState({ ...reqDataDefault, ...requestData })   // 请求数据
  const [loading, setLoading] = useState(true)                                   // loading

  /**
   * 初始化请求
   * @param data 请求参数，默认为
   */
  const initData = async (data = reqData) => {
    !loading && setLoading(true)
    const res = await request({ url: props.url, method: 'get', params: { ...data, ...requestData } }) // data: { ...data, ...requestData }
    if (res.code === 200) {
      if (res.result instanceof Object) setTableData({ ...tableData, ...res.result, page: data.page })
      if (res.result instanceof Array) setTableData({ ...tableData, list: res.result, page: data.page })
    } else {
      message.warning(res.msg || '请求超时')
    }
    setLoading(false)
  }

  /**
   * 请求数据
   */
  useEffect(() => {
    setLoading(true)
    initData()
  }, [reqData, refresh])

  /**
     * 获取列表成功回调
     */
  useEffect(() => {
    if (tableData && tableData.list?.length) {
      successCb(tableData, setTableData)
    }
  }, [tableData])

  /**
   * tabs status
   * @param name 
   * @param value 
   */
  const onStatusChangeHandler = (name, value) => {
    // console.log(name, value);
    if (value) {
      setReqData({ ...reqData, ...{ [name]: value } });
    } else {
      setReqData({ ...reqData, ...{ [name]: null } });
    }
  }

  /**
     * 分页器事件
     * @param page 
     * @param limit 
     */
  const handlePageChange = (page, limit) => {
    // console.log(page, limit);
    setReqData({ ...reqData, page, limit });
    setTimeout(() => {
      document.querySelector('.ant-layout-content div').scrollTop = 0;
    }, 0)
  }

  /**
     * 分页器配置
     */
  const pagination = {
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
    total: tableData?.total,
    limit: tableData?.limit,
    current: tableData?.page,
    showSizeChanger: true,
    showTotal: (total) => `总共${total}条`,
    size: 'default'
  }

  /**
   * 多选配置
   */
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectRowKeys,
    hideOnSinglePage: true,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    },
    columnWidth: 1,
    renderCell: renderCell
  };

  const SortableItem = sortableElement(props => <tr {...props} />);
  const SortableContainer = sortableContainer(props => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log(oldIndex, newIndex);
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(tableData?.list), oldIndex, newIndex).filter(el => !!el);
      // console.log('Sorted items: ', newData);
      // this.setState({ dataSource: newData });
      setTableData({ ...tableData, list: newData });
    }
  };

  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = useCallback(({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = tableData?.list?.findIndex(x => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  }, [tableData]);

  /**
   * 拖拽
   */
  const dragComponent = {
    body: {
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
    },
  }

  return (
    <div className="dkb-table">
      <div className="inner-area">
        {
          tabs && <SwitchStatusBar {...tabs} onChange={onStatusChangeHandler} />
        }
        <TableOperatorTools {...tools} />
      </div>
      <Table
        columns={props?.columns}
        dataSource={tableData.list}
        rowKey={props?.rowKey}
        rowSelection={props?.row && rowSelection}
        size="middle"
        onChange={onTableChange}
        loading={loading}
        pagination={paginationFlag ? pagination : {}}
        expandable={expandable}
        // expandIconAsCell={expandIconAsCell}
        expandIconColumnIndex={expandIconColumnIndex}
        onRow={onRow}
        components={drag ? dragComponent : {}}
      />
    </div>
  )
})

export default DkbTable;