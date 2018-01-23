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
		console.log(getMinDate(this.props.history))			
		}
		

		return(
			<div>

			</div>
			)
	}
}