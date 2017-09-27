import React from 'react';
import createReactClass from 'create-react-class';

import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';

import history from '../../asset/skill-history';

import skillHistoryStyl from './skill-history-component.styl';



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
	setElement(el){
		this._el = el
	}

	componentDidMount(){
		console.log(this._el.offsetWidth)
	}

	render() {
		return (
			<div className={skillHistoryStyl.content} ref={this.setElement.bind(this)}>
				<input type="text" onChange={this.handleSearch.bind(this)} className={skillHistoryStyl.input}/>
				<div>
					<ul>
						{
							this.state.displayList.map((item, index) => {
								return <SkillHistoryItemComponent name={item.name} key={index} date={item.date} period=""/>
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}