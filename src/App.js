import { useState, useLayoutEffect } from 'react'
import { ConfigProvider } from 'antd';
import { useHistory } from 'react-router-dom'

import moment from 'moment';
import 'moment/locale/zh-cn';

import zhCN from 'antd/lib/locale/zh_CN';
import Layout from '@/components/layout'

import './App.less';
moment.locale('zh-cn');


function App() {

  const history = useHistory()


  useLayoutEffect(() => {
    // const Authorization = localStorage.getItem('Dense-Diary-Authorization')
    // !Authorization && history.replace('/merchantManage/list')

  }, [])
  const [lang] = useState(zhCN)


  return (
    <ConfigProvider locale={lang}>
      <Layout />
    </ConfigProvider>
  );
}

export default App;
