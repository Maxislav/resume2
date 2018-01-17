const data = {e:null, xy: {x:null, y: null}}

const hoverReducer = (state ={data}, action) => {

  switch (action.type) {
    case 'HANDLE_HOVER': {
      console.log(action.data.e.target)

      const xy = {
        x: action.data.e.screenX, y: action.data.e.screenY
      }

      return {...state,  data: {xy}}
    }
  }
  return {...state}

}

export default hoverReducer