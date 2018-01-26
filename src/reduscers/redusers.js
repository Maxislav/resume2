import {combineReducers} from 'redux'
import skillReducer from './skill-reducer'
import filterReducer from './filter-history-reduser'
import hoverReducer from './hover-reducer'
import experienceReducer from './experience-reducer'
import ownProjectReducer from './own-project-reducer'
const reducers = combineReducers({
  skillReducer,
  filterReducer,
  hoverReducer,
  experienceReducer,
  ownProjectReducer
});

export default reducers;