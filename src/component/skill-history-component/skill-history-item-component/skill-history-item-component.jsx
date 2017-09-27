import React from 'react';
import SkillHistoryItemStyl from './skill-history-item-component.styl';
import { autobind } from 'core-decorators';



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
			const offset = date[0] ? new Date(date[0]).getTime() - start : new Date();
			const scaleX = period/totalWidth;
			const date1 = new Date(date[0]);
			const date2 = date[1] ? new Date(date[1]) : new Date();
			const length = date2.getTime() - date1.getTime();
			el.style.left = offset/scaleX +'px';
			el.style.width = length/scaleX +'px';
		})

	}

	handleHover(e){
			console.log(e)
	}



	render() {
		return (
			<li>
				<div>
					{this.props.name}
				</div>
				<ul className={SkillHistoryItemStyl.row} >
					{
						this.props.date.map((item, index) => {
							return (
								<li key={index}  ref={el=>this.getPositionLeft(el, item)} className={SkillHistoryItemStyl.it} onMouseEnter={this.handleHover} >
									<div className="flex">
										{
											item.map((date, i) => {
												const d = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();
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
			</li>
		)
	}
}