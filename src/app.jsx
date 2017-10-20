import React from 'react';
import {combineReducers, createStore} from 'redux'
import TitleComponent from './component/title-component/title-component';
import appStyl from './app.styl';


import HashRouterComponent from "./component/hash-router-component/hash-router-component";


const userReducer = function (state = {}, action) {
  switch (action.type){
    case "CHANGE_NAME" : {
      state = {...state, name: action.value};
      break;
    }
    case "CHANGE_AGE": {
      state = {...state, age: action.value};
      break;
    }

  }
  return state
};


const tweetReducer = function (state = [], actions) {
  return state
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetReducer
})

const store = createStore(reducers)

store.subscribe(()=>{
  console.log("store change", store.getState())
})

store.dispatch({type: 'CHANGE_NAME', value: "WILL"})
store.dispatch({type: 'CHANGE_AGE', value: 35})


export default class App extends React.Component{
    css = appStyl;
    render(){
        return (
            <div className={this.css.content}>
                <TitleComponent/>
                <HashRouterComponent/>
            </div>
        )
    }

}