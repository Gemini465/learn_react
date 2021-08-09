import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import reduxStore from './redux/store';
import App from './App';
import 'antd/dist/antd.less';
import './style/reset.css';
import './style/index.less';

ReactDOM.render(
   <BrowserRouter>
      <Provider store={reduxStore}>
         <App/>
      </Provider>
   </BrowserRouter>,
    document.getElementById('root')
);

