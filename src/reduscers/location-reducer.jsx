
export const locationReducer = (state={currentLocation: ''}, action) =>{
  switch (action.type){
    case 'LOCATION_CHANGE':{
      return {...state, currentLocation: action.currentLocation }
    }
    default:
      return state
  }
}
