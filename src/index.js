import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'

import store from '@/store'
// import '@/assets/css/global.less'
import '@/assets/css/normalize.css'
import '@/assets/css/reset.less'
import 'antd/dist/antd.less'
import '@/assets/css/common.less'

const Login = React.lazy(() => import('./pages/login'));
const Shop = React.lazy(() => import('./pages/shop'));
const App = React.lazy(() => import('./App'));

const globalCss = require('./assets/css/global.json')

console.log(globalCss);
const body = document.body;
for (let key in globalCss) {
  body.style.setProperty(key, globalCss[key])
  // console.log(key);
}

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/login" render={(routerData) => <Suspense fallback={<div>Loading...</div>}><Login {...routerData}></Login></Suspense>} />
        <Route path="/shop" render={(routerData) => <Suspense fallback={<div>Loading...</div>}><Shop {...routerData}></Shop></Suspense>} />
        <Route path="/" render={(routerData) => <Suspense fallback={<div>Loading...</div>}><App {...routerData}></App></Suspense>}></Route>
      </Switch>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);


