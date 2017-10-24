import {combineReducers} from 'redux'
import skillReducer from './skill-reducer'
import filterReducer from './filter-history-reduser'

const reducers = combineReducers({
  skillReducer,
  filterReducer
});

export default reducers;