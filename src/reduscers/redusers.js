import {combineReducers} from 'redux'
import skillReducer from './skill-reducer'
import filterReducer from './filter-history-reduser'
import hoverReducer from './hover-reducer'

const reducers = combineReducers({
  skillReducer,
  filterReducer,
  hoverReducer
});

export default reducers;