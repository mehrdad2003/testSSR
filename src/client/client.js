import React from 'react'
import 'babel-polyfill'
import ReactDOM  from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {renderRoutes} from 'react-router-config'
import axios from 'axios'
import Routes from './Routes'
import reducers from './reducers'
const axiosInstance = axios.create({
    baseURL: '/api'
  });
  
  const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
ReactDOM.hydrate(
    <Provider store={store}>
    <BrowserRouter>
    <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
    </Provider>
    ,document.querySelector('#root'))