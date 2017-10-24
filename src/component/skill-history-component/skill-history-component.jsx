import React from 'react';
import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';
import history from '../../asset/skill-history';
import skillHistoryStyl from './skill-history-component.styl';
import $Promise from  '../../asset/promise'
import {autobind } from 'core-decorators';
import  {connect} from 'react-redux'
import axios from 'axios'

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



@connect((store) => {
  return {
    history: store.skillReducer.history,
		filterHistory: store.filterReducer.history
  }
})
export default class SkillHistoryComponent extends React.Component {


	constructor(props) {
		super(props);
		this._el = null;
		this._widthPromise = new $Promise();
		console.log(this.props)
	}

	@autobind
	handleSearch(e) {
		const displayList = this.props.history.filter(it => {
			return it.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
		});

		this.props.dispatch({
			type: 'FILTER',
			filterBy: e.target.value.toLowerCase(),
      payload: this.props.history
		})
		this.setState({
			displayList
		})
	}

	@autobind
	setElement(el){
		this._el = el;
  }

	componentDidMount(e){
    this.props.dispatch({
      type:'FETCH_HISTORY',
      payload: axios.get('asset/user.json')
    });
		this._widthPromise.resolve(this._el.offsetWidth)
	}

	render() {
		return (
			<div className={skillHistoryStyl.content} >
				<div ref={this.setElement}>
					<input type="text" onChange={this.handleSearch} className={skillHistoryStyl.input}/>
					<div>
						<ul>
							{
								this.props.filterHistory.map((item, index) => {
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