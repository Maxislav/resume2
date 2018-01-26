const initState = {
  fetching: false,
  error: null,
  list: []
}
export default function(state=initState, action){
  switch (action.type){
    case 'FETCH_OWN_PROJECT_PENDING': {
      return {...state, fetching: false};
    }
    case 'FETCH_OWN_PROJECT_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_OWN_PROJECT_FULFILLED': {
      return {...state, fetching: true, list: action.payload.data };
    }

  }
  return state
}