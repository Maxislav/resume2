import React from 'react';
import styl from './skill-history-item-component.styl';
import { autobind } from 'core-decorators';
import hoverReducer from "../../../reduscers/hover-reducer";
import connect from "react-redux/es/connect/connect";
import {NormalDate} from "../../../asset/normal-date";



@connect((store)=>{
	return {
    data: store.hoverReducer.data
	}
})
export default class SkillHistoryItemComponent extends React.Component {

	/**
	 * @param   {Object}props
	 * @property {Array} date
	 * @property {Promise.<number>} total-width
	 * @property {Date} min-date
	 */
	constructor(props){
		super(props);
	}

	componentWillMount() {

	}

	@autobind
	getPositionLeft(el, date){

		this.props['total-width'].then(totalWidth=>{
			const start = this.props['min-date'].getTime();
			const finish = Date.now();
			const period = finish - start;
			const offset = date[0] ? new NormalDate(date[0]).getTime() - start : new Date();
			const scaleX = period/totalWidth;
			const date1 = new NormalDate(date[0]);
			const date2 = date[1] ? new NormalDate(date[1]) : new Date();
			const length = date2.getTime() - date1.getTime();
      if(el)	el.style.left = offset/scaleX +'px';
			if(el) el.style.width = length/scaleX +'px';
		})

	}

	@autobind
  onMouseMove( e, item){
    this.props.dispatch({
			type: 'HANDLE_MOVE',
      data: {e}
		})
	}

  @autobind
	onMouseEnter(e, item) {
    this.props.dispatch({
			type: 'ON_MOUSE_ENTER',
			data: {show: true, item}
		})
	}

	@autobind
  onMouseLeave( e, item){
    this.props.dispatch({
      type: 'ON_MOUSE_ALIVE',
			data: {show: false}
    })
	}


	render() {
		return (
			<div >
				<div>
					<b>{this.props.name}</b>
				</div>
				<ul className={styl.row}>
					{
						this.props.date.map((item, index) => {
							return (
								<li key={index}  ref={el=>this.getPositionLeft(el, item)}
										className={styl.it}
										onMouseMove={e=>this.onMouseMove(e, item)}
                    onMouseEnter={e=>this.onMouseEnter(e, item)}
                    onMouseLeave={e=>this.onMouseLeave(e, item)}
								>
									<div className="relative">
										{
											item.map((date, i) => {
												const d = date ? new NormalDate(date).toLocaleDateString() : new Date().toLocaleDateString();
												return (
													<div key={i} className="margin-0-8">
														{d}
													</div>
												)
											})
										}
									</div>
								</li>
							)
							})
					}
				</ul>
			</div>
		)
	}
}