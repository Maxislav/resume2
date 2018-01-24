import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getMinDate} from '../asset'
import styl from './skill-history-ruler-component.styl'


const setLeft = (el, date, minDate) => {
	if(!el){
		return
	}

	const totalWidth = el.parentElement.offsetWidth
	const totalPeriod = new Date().getTime() - minDate.getTime()

	const left = Math.floor(totalWidth/totalPeriod*(date.getTime() - minDate.getTime()))
  el.style.left = left - el.offsetWidth/2 +'px';



	return '0px'
}

@connect((store) => {
  return {
    history: store.skillReducer.history,
  }
})
export default class SkillHistoryRulerComponent extends Component{

  componentDidMount(){
	}

	render(){
		const dateList = []
		if(this.props.history.length){
			let variableDateMin = getMinDate(this.props.history).getTime()
			const dateNow = new Date().getTime()
			while(new Date(variableDateMin+=(24*3600*1000)).getTime() < dateNow){
				if(new Date(variableDateMin).getMonth() == 0 && new Date(variableDateMin).getDate() == 1 ){
          dateList.push(new Date(variableDateMin))
				}
			}
		}
		

		return(
			<div className={styl.relative}>
				Year
				{
          dateList.map((d, i) => {

						return (

							<div className={styl.absolute} key={i} ref={el=>setLeft(el, d, getMinDate(this.props.history))}>
								<div>
                  {d.getFullYear()}
								</div>
								<div className={styl.arrow}>
									&nbsp;
								</div>
							</div>
						)
					})
				}
			</div>
			)
	}
}