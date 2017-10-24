
const initState = {
  fetching: false,
  error: null,
  history: []
}

const skillReducer = (state = initState, action) =>{

  switch (action.type){
    case 'FETCH_HISTORY_PENDING': {
      return {...state, fetching: false};
    }
    case 'FETCH_HISTORY_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_HISTORY_FULFILLED': {
      return {...state, fetching: true, history: action.payload.data};
    }
  }
  return state
}

export default skillReducer