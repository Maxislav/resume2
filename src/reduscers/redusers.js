import {combineReducers} from 'redux'
import skillReducer from './skill-reducer'
import filterReducer from './filter-history-reduser'
import hoverReducer from './hover-reducer'
import expirienceReducer from './expirience-reducer'

const reducers = combineReducers({
  skillReducer,
  filterReducer,
  hoverReducer,
  expirienceReducer
});

export default reducers;