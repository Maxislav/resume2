import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import TitleComponent from './component/title-component/title-component';
import thunk from 'redux-thunk';
import  promise from 'redux-promise-middleware'

import axios from 'axios'
import appStyl from './app.styl';

console.log(axios.get)

import { createLogger } from 'redux-logger'

//console.log(createLogger)

const logger = createLogger({})

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

const store = createStore(
  reducers,
  applyMiddleware(promise(), thunk, createLogger()))

store.subscribe(()=>{
  //console.log("store change", store.getState())
})

store.dispatch((dispatch) => {
  dispatch({type: 'CHANGE_NAME'})
  axios.get("asset/user.json")
    .then(response => {
      dispatch({type: 'USE_LOAD'})
    })
})

//store.dispatch({type: 'CHANGE_NAME', value: "WILL"})
//store.dispatch({type: 'CHANGE_AGE', value: 35})


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