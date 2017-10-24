import initState from '../init-state-const';

//const
let history = []

const skillReducer = (state = initState, action) =>{
  switch (action.type){
    case 'FETCH_HISTORY_PENDING': {
      return {...state, fetching: false};
    }
    case 'FETCH_HISTORY_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_HISTORY_FULFILLED': {
      history = action.payload.data;
      return {...state, fetching: true, history};
    }
    case 'FILTER_HISTORY' :{
      console.log('action -> ',action);
      return {...state, filterBy: action.filterBy, history: history.filter(it => {
        return it.name.toLowerCase().indexOf(action.filterBy) != -1
      })}
    }
  }
  return state
};
export default skillReducer