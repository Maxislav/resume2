import React from 'react';
import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';
import SkillHistorySimpleComponent from './skill-history-simple-component/skill-history-simple-component';
import styl from './skill-history-component.styl';
import $Promise from  '../../asset/promise'
import {autobind } from 'core-decorators';
import {connect} from 'react-redux'
import axios from 'axios'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactInfoComponent from '../../component/contact-component/contact-info-component/contact-info-component'


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




@connect((store) => {
  return {
  	filterBy:store.skillReducer.filterBy,
    history: store.skillReducer.history,
		filterHistory: store.filterReducer.history,
  }
})
export default class SkillHistoryComponent extends React.Component {


	constructor(props) {
		super(props);
		this._el = null;
		this._widthPromise = new $Promise();
		this.state = {
			shortView : false
    }
	}

	@autobind
	handleSearch(e) {
		const displayList = this.props.history.filter(it => {
			return it.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
		});

		this.props.dispatch({
			type: 'FILTER_HISTORY',
			filterBy: e.target.value.toLowerCase(),
		});
		/*this.setState({
			displayList
		})*/
	}

	@autobind
	setElement(el){
		this._el = el;
  }

  @autobind
  onReset(e){
    this.props.dispatch({
      type: 'FILTER_HISTORY',
      filterBy: '',
    })
	}




  @autobind
	onSimpleDetailView(){
  	this.setState({
      shortView: !this.state.shortView
		})
	}





	componentDidMount(e){
    this.props.dispatch({
      type:'FETCH_HISTORY',
      payload: axios.get('asset/skill-history.json')
    });
		this._widthPromise.resolve(this._el.offsetWidth)
	}

  render() {
    const button = <button onClick={this.onReset}>reset</button>;
    return (
			<div className={styl.content}>
				<div>
					<ContactInfoComponent/>
				</div>
				<button onClick={this.onSimpleDetailView}>{!this.state.shortView ? 'Simple view': 'Detail list'}</button>

				<h2>&nbsp;</h2>

				<div>{this.state.shortView ? (
					<TransitionGroup>
						<CSSTransition
							classNames='repeat'
							timeout={{enter: 500, exit: 500}}>
							<SkillHistorySimpleComponent/>
						</CSSTransition>
					</TransitionGroup>
					) : (
						<div>
							<h3>Base libs & frameworks(detail view)</h3>
							<div ref={this.setElement}>
								<input type="text" onChange={this.handleSearch} className={styl.input}
											 placeholder="search filter"
											 value={this.props.filterBy}/>
                {this.props.filterBy ? button : null}
								<div>
									<TransitionGroup>
                    {
                      this.props.history.map((item, index) => {
                        return <CSSTransition
													key={index}
													classNames='repeat'
													timeout={{enter: 500, exit: 500}}>
													<div className={styl['history-row']}>
														<SkillHistoryItemComponent name={item.name} key={index} date={item.date}
																											 total-width={this._widthPromise} min-date={getMinDate(this.props.history)}/>
													</div>
												</CSSTransition>
                      })
                    }
									</TransitionGroup>
								</div>
							</div>
						</div>
					) }</div>
			</div>
    )
  }
}