import {createStore, applyMiddleware} from "redux";
import reducers from './reduscers/redusers';
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk';
let middleware;


if(NODE_ENV == 'devb'){
  const {createLogger} = require('redux-logger')
  const logger = createLogger();
  middleware =  applyMiddleware(promise(), thunk, logger);
}else {
  middleware =  applyMiddleware(promise(), thunk);
}
const store = createStore( reducers, middleware );
export default store
