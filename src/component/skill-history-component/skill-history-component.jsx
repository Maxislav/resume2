import React from 'react';
import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';
import history from '../../asset/skill-history';
import skillHistoryStyl from './skill-history-component.styl';
import $Promise from  '../../asset/promise'
import { autobind } from 'core-decorators';

import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import axios from 'axios'
import { createLogger } from 'redux-logger';


const logger = createLogger();
const middleware =  applyMiddleware(promise(), thunk, logger);

const initState = {
	fetching: false,
	error: null,
	history: []
}


const skillReducer = (state = initState, action) =>{

	switch (action.type){
		case 'FETCH_HISTORY_PENDING': {
			return {...state, fetching: false};
		}
		case 'FETCH_HISTORY_REJECTED': {
			return {...state, fetching: false, error: action.payload};
		}
		case 'FETCH_HISTORY_FULFILLED': {
			return {...state, fetching: true, history: action.payload};
		}
	}
	return state
}


const reducers = combineReducers({
  history: skillReducer,
})


const store = createStore( reducers, middleware );


store.dispatch({
  type:'FETCH_HISTORY',
  payload: axios.get('asset/user.json')
})



/**
 * @param {Array.<SkillItem>}list
 * @return {Date}
 */
const getMinDate = (list) =>{
	let minDate = Infinity;
	list.forEach(skillItem=>{
		skillItem.date.forEach(d=>{
			d.forEach(d=>{
				if(d!==null){
					const dateLong = new Date(d).getTime()
					if(dateLong<minDate){
						minDate = dateLong
					}
				}
			})
		})
	});
	return new Date(minDate)
}
const minDate = getMinDate(history)

console.log(minDate)

export default class SkillHistoryComponent extends React.Component {


	constructor(props) {
		super(props);
		this._el = null;
		this._width = 0;
		this._widthPromise = new $Promise();
		this.state = {
			displayList: history
		};

		//console.log(this)
	}
	handleSearch(e) {
		const displayList = history.filter(it => {
			return it.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
		});
		this.setState({
			displayList
		})
	}

	@autobind
	setElement(el){
		this._el = el
	}

	componentDidMount(){
		this._widthPromise.resolve(this._el.offsetWidth)
	}

	render() {
		return (
			<div className={skillHistoryStyl.content} >
				<div ref={this.setElement}>
					<input type="text" onChange={this.handleSearch.bind(this)} className={skillHistoryStyl.input}/>
					<div>
						<ul>
							{
								this.state.displayList.map((item, index) => {
									return <SkillHistoryItemComponent name={item.name}  key={index} date={item.date} total-width={this._widthPromise} min-date={getMinDate(history)}/>
								})
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}