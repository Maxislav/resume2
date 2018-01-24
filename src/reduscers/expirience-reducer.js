const initState = {
	fetching: false,
	  error: null,
	  list: []
}

const expirienceReducer = (state=initState, action) => {
	switch (action.type){
	    case 'FETCH_EXPIRIENCE_PENDING': {
	      return {...state, fetching: false};
	    }
	    case 'FETCH_EXPIRIENCE_REJECTED': {
	      return {...state, fetching: false, error: action.payload};
	    }
	    case 'FETCH_EXPIRIENCE_FULFILLED': {
	      return {...state, fetching: true, list: action.payload.data };
	    }
	    
	  }
	  
	
	return state
}

export default expirienceReducer