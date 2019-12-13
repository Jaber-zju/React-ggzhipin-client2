import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter,Route,Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import store from './redux/store'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'

const render = () => {
  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route component={Main}/>
          </Switch>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root'));
}

render()

store.subscribe(render)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
