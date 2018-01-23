const data = {
  e: null,
  parentEl: null,
  xy: {
    x: null,
    y: null
  },
  show: false,
  item: null
};

const hoverReducer = (state = {data}, action) => {

  switch (action.type) {
    case 'PARENT_EL':
      return {...state, data: {...data, parentEl: action.data.parentEl }}
    case 'ON_MOUSE_ENTER':
      return {...state, data: {...state.data, show: action.data.show, item:action.data.item} }
    case 'ON_MOUSE_ALIVE':
      return {...state, data: {...state.data, show: action.data.show} }
    case 'HANDLE_MOVE': {
      const xy = {
        x: action.data.e.pageX, y: action.data.e.pageY
      };
      return {...state,  data:  {...state.data, xy  }}
    }
  }
  return {...state}

}

export default hoverReducer