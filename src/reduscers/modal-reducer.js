'use strict';

const defaultState = {
  isShow: false,
  src: null
}
export const modalReducer = (state = defaultState, action) =>{
  switch (action.type) {
    case "MODAL_SHOW":
      return {...state, src: action.src, isShow: true};
    case 'MODAL_HIDE':
      return {...state, src: null, isShow: false};
    default:
      return state
  }
};

