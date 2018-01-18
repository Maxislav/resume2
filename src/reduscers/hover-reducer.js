const data = {
  e: null,
  parentEl: null,
  xy: {
    x: null,
    y: null
  },
  show: false
};

const hoverReducer = (state ={data}, action) => {

  switch (action.type) {
    case 'PARENT_EL':
      data.parentEl = action.data.parentEl
      return {...state, data}
    case 'ON_MOUSE_ENTER':
    case 'ON_MOUSE_ALIVE':
      data.show = action.data.show
      return {...state, data: {...data, show: action.data.show } }
    case 'HANDLE_MOVE': {
      console.log(action.data.e.target)

      data.xy = {
        x: action.data.e.pageX, y: action.data.e.pageY
      }


      return {...state,  data:  {...data, action }}
    }
  }
  return {...state}

}

export default hoverReducer