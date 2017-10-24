import {createStore, applyMiddleware} from "redux";
import skillReducer from './reduscers/skill-reducer'
import reducers from './reduscers/redusers';
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import {createLogger} from "redux-logger";
const logger = createLogger();
const middleware =  applyMiddleware(promise(), thunk, logger);

const store = createStore( reducers, middleware );


export default store
