'use strict';

const defaultState = {
  isShow: false,
  imgSrc: null
}
export const modalReducer = (state = defaultState, action) =>{
  switch (action.type) {
    case "MODAL_SHOW":
      return {...state, imgSrc: action.imgSrc, isShow: true};
    case 'MODAL_HIDE':
      return {...state, imgSrc: null, isShow: false};
    default:
      return state
  }
};

