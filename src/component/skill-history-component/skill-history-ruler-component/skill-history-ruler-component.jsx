import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getMinDate} from '../asset'
@connect((store) => {
  return {
    history: store.skillReducer.history,
  }
})

export default class SkillHistoryRulerComponent extends Component{
	render(){
		if(this.props.history.length){
		//console.log(getMinDate(this.props.history))
			let dateMin = getMinDate(this.props.history).getTime()
			const dateNow = new Date().getTime()
			while(new Date(dateMin+=(24*3600*1000)).getTime() < dateNow){
				if(new Date(dateMin).getDate() == 1 && new Date(dateMin).getMonth() == 0){
					console.log(new Date(dateMin))
				}
			}
		}
		

		return(
			<div>

			</div>
			)
	}
}