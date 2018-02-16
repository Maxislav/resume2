import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux'
import store from './store'
import './styl/global.styl'
import {createStore, applyMiddleware} from "redux";
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {ModalComponent} from "./component/modal-component/modal-component";
/*
const reducer = (state = {}, action) => {
	return state
}

const logger = createLogger();
const middleware =  applyMiddleware(promise(), thunk, logger);
const store = createStore(reducer, middleware)*/



ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('rootEl')
);