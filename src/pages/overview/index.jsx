import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Tabs, DatePicker } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import { getMonthDays } from '@/utils';
import './style.less';
import avatarPic from '@/assets/images/avatar.jpg';
import service from '@/assets/images/service.png';

const { TabPane } = Tabs;
// const allCharts = [
//   {
//     active: true,
//     chart: null,
//     id: '#monthly-sales'
//   },
//   {
//     active: false,
//     chart: null,
//     id: '#monthly-order'
//   },
//   {
//     active: false,
//     chart: null,
//     id: '#customer-increment'
//   },
//   {
//     active: false,
//     chart: null,
//     id: '#current-customer-consumption'
//   },
// ]

const Overview = () => {
  // 统计数据
  const datas = [
    {
      text: '未发货订单',
      num: 0,
    },
    {
      text: '当日销售额(元)',
      num: 0,
    },
    {
      text: '平均客单价(元)',
      num: 0,
    },
    {
      text: '昨日新增客户',
      num: 0,
    },
    {
      text: '累计客户',
      num: 0,
    },
    {
      text: '累计好评度',
      num: 0,
    },
    {
      text: '昨日好评数',
      num: 0,
    },
    {
      text: '昨日中评数',
      num: 0,
    },
    {
      text: '昨日差评数',
      num: 0,
    },
    {
      text: '累计好评数',
      num: 0,
    },
  ];

  // 产品动态
  const productDynamic = [
    {
      id: 1,
      text: '档口宝动态发布',
      date: '03-01'
    },
    {
      id: 2,
      text: '档口宝动态发布',
      date: '03-01'
    },
    {
      id: 3,
      text: '档口宝动态发布',
      date: '03-01'
    },
    {
      id: 4,
      text: '档口宝动态发布',
      date: '03-01'
    },
  ]

  // 登录日志
  const loginLog = [
    {
      id: 1,
      ip: '192.168.1.1',
      address: '福建省.福州市',
      date: '2021-03-16 23:51',
      msg: '登陆成功'
    },
    {
      id: 2,
      ip: '192.168.1.1',
      address: '福建省.福州市',
      date: '2021-03-16 23:51',
      msg: '登陆成功'
    },
    {
      id: 3,
      ip: '192.168.1.1',
      address: '福建省.福州市',
      date: '2021-03-16 23:51',
      msg: '登陆成功'
    },
    {
      id: 4,
      ip: '192.168.1.1',
      address: '福建省.福州市',
      date: '2021-03-16 23:51',
      msg: '登陆成功'
    },
    {
      id: 5,
      ip: '192.168.1.1',
      address: '福建省.福州市',
      date: '2021-03-16 23:51',
      msg: '登陆成功'
    },
  ]

  /**
   * 图标切换
   * @param {*} key 
   */
  const chartChange = (key) => {
    console.log(key);
  }

  /**
   * 切换月
   * @param {*} value 
   */
  const onMonthChange = (value) => {
    console.log(value);
  }

  /**
   * 初始化
   */
  const initialCharts = () => {
    const { days, dayArr } = getMonthDays();
    const curDom = document.querySelector('#monthly-sales');
    const monthlySales = echarts.init(curDom);
    monthlySales.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: dayArr
      },
      grid: {
        top: '57px',
        bottom: '56px',
        left: '47px',
        right: '20px',
      },
      yAxis: {
        type: 'value',
        name: '月销售额',
        nameTextStyle: {
          color: 'rgba(0,0,0,0.85)',
          fontSize: 16,
          fontWeight: 600,
          padding: [10, 0, 5, 0]
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      series: [{
        data: new Array(days).fill(0),
        type: 'line',
        areaStyle: {},
        smooth: 0.3,
        symbol: 'none',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: 'rgba(24,144,255, 1)' // 0% 处的颜色
          }, {
            offset: 0.5, color: 'rgba(24,144,255, 0.5)' // 100% 处的颜色
          }, {
            offset: 1, color: 'rgba(24,144,255, 0.1)' // 100% 处的颜色
          }]
          ),  //背景渐变色 
        }
      },
        // {
        //   data: [0, 15, 20, 25, 12, 10, 0, 0, 0, 0, 0, 0],
        //   type: 'line',
        //   areaStyle: {},
        //   smooth: 0.3,
        //   symbol: 'none',
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //       offset: 0, color: 'rgba(72,235,254, 1)' // 0% 处的颜色
        //     }, {
        //       offset: 0.5, color: 'rgba(72,235,254, 0.5)' // 100% 处的颜色
        //     }, {
        //       offset: 1, color: 'rgba(72,235,254, 0.1)' // 100% 处的颜色
        //     }]
        //     ),  //背景渐变色 
        //   }
        // }
      ]
    })
  }

  useEffect(() => {
    initialCharts();
  }, [])

  const operations = <DatePicker onChange={onMonthChange} picker="month" />;

  return (
    <div className="overview outer-area">
      <div className="overview-main">
        <div className="main-head bg-white m-b-20">
          <div className="head-avatar m-r-20">
            <Avatar src={avatarPic} size={72} />
          </div>
          <div className="head-content">
            <div className="head-content-title">
              早安，Serati Ma，祝你开心每一天！
              </div>
            <div className="head-content-subTitle">
              世界会向那些有目标和远见的人让路、造物之前，必先造人。
              </div>
          </div>
          <div className="head-task">
            <div className="head-task-box">
              <div className="head-task-box-title">待办任务</div>
              <div className="head-task-box-total">8</div>
            </div>
            <Divider type="vertical" />
            <div className="head-task-box">
              <div className="head-task-box-title">已办任务</div>
              <div className="head-task-box-total">8</div>
            </div>
            <Divider type="vertical" />
            <div className="head-task-box">
              <div className="head-task-box-title">全部任务</div>
              <div className="head-task-box-total">16</div>
            </div>
          </div>
        </div>
        <div className="main-middle bg-white m-b-20">
          <div className="main-middle-top">
            <div className="main-middle-top-inner">
              {
                datas.filter((_, index) => (
                  index < 5
                )).map((data) => (
                  <div className="main-middle-top-cell" key={data.text}>
                    <div className="cell-text">{data.text}</div>
                    <div className="cell-num">{data.num}</div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="main-middle-bottom">
            <div className="main-middle-bottom-inner">
              {
                datas.filter((_, index) => (
                  index >= 5
                )).map((data) => (
                  <div className="main-middle-bottom-cell" key={data.text}>
                    <div className="cell-text">{data.text}</div>
                    <div className="cell-num">{data.num}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="main-chart bg-white">
          <Tabs
            defaultActiveKey="1"
            size="large"
            onChange={chartChange}
            tabBarExtraContent={operations}
          >
            <TabPane tab="月销售额" key="1">
              <div id="monthly-sales" style={{ height: '100%' }}></div>
            </TabPane>
            <TabPane tab="月订单量" key="2">
              <div id="monthly-order" style={{ height: '100%' }}></div>
            </TabPane>
            <TabPane tab="客户增量" key="3">
              <div id="customer-increment" style={{ height: '100%' }}></div>
            </TabPane>
            <TabPane tab="现客户消费" key="4">
              <div id="current-customer-consumption" style={{ height: '100%' }}></div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="overview-side">
        <div className="side-service bg-white m-b-20">
          <img src={service} className="m-r-20" alt="" />
          <div className="side-service-content">
            <div className="content-title">在线客服</div>
            <div className="content-sub-title">
              点此咨询软件相关问题
            </div>
          </div>
        </div>
        <div className="side-product bg-white m-b-20">
          <div className="side-product-head side-item-head">
            <span>产品动态</span>
            <EllipsisOutlined onClick={() => { }} />
          </div>
          <div className="side-product-content">
            {
              productDynamic.map((p) => (
                <div className="side-product-content-item" key={p.id}>
                  <span>{p.text}</span>
                  <span>{p.date}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="side-log bg-white">
          <div className="side-log-head side-item-head">
            <span>登录日志</span>
            <EllipsisOutlined onClick={() => { }} />
          </div>
          <div className="side-log-content">
            {
              loginLog.map((log) => (
                <div className="side-log-content-item" key={log.id}>
                  <div className="left">
                    <span>{log.ip}</span>
                    <span style={{ color: 'rgba(0,0,0,0.45)' }}>{log.address}</span>
                  </div>
                  <div className="right">
                    <span style={{ color: 'rgba(0,0,0,0.45)' }}>{log.date}</span>
                    <span>{log.msg}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="overview-foot">
        Copyright © 2015-2021 成都档口宝科技有限公司 All Rights Reserved. 蜀ICP备2020034790号-1
      </div>
    </div>
  )
}

export default Overview;