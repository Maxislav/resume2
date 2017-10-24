import initState from '../init-state-const';
const filterReducer = (state = initState, action) => {
  switch (action.type){

    case 'FETCH_HISTORY_FULFILLED': {
      return {...state, fetching: true, history: action.payload.data};
    }
    case 'FILTER': {
      const displayList = action.payload.filter(it => {
        return it.name.toLowerCase().indexOf(action.filterBy) != -1
      });
      return {...state, history: displayList}
    }
  }

  return state
}

export default filterReducer