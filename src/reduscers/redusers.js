import {combineReducers} from 'redux'
import skillReducer from './skill-reducer'
import filterReducer from './filter-history-reducer'
import hoverReducer from './hover-reducer'
import experienceReducer from './experience-reducer'
import ownProjectReducer from './own-project-reducer'
import {locationReducer} from './location-reducer'
import {modalReducer} from './modal-reducer'
const reducers = combineReducers({
  skillReducer,
  filterReducer,
  hoverReducer,
  experienceReducer,
  ownProjectReducer,
  locationReducer,
  modalReducer
});

export default reducers;