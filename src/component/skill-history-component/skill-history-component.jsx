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
import SkillHistoryTileComponent from './skill-history-tile-component/skill-history-tile-component'
import Transition from 'react-transition-group/Transition';
import SkillHistoryRulerComponent from './skill-history-ruler-component/skill-history-ruler-component'
import {getMinDate} from './asset'


const transitionDuration = 100;
const defaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
}


const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited:{ opacity: 0 }
};

const ButtonReset = ({in: inProp, onReset: onReset }) => (
  <Transition in={inProp} timeout={transitionDuration}>
    {(state) => (
      <button onClick={onReset} style={{...defaultStyle,...transitionStyles[state]}}>
				reset
      </button>
    )}
  </Transition>
)

@connect((store) => {
  return {
  	filterBy:store.skillReducer.filterBy,
    history: store.skillReducer.history,
	filterHistory: store.filterReducer.history,
    data: store.hoverReducer.data
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
		this.props.dispatch({
			type:'PARENT_EL',
			data: {parentEl: el}
		})
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
      payload: axios.get('cv-json-data/skill-history.json')
    });
		this._widthPromise.resolve(this._el.offsetWidth)
	}

  render() {
    return (
			<div className={styl.content}>
				<div>
					<ContactInfoComponent/>
				</div>
				<button onClick={this.onSimpleDetailView}>{!this.state.shortView ? 'Simple view': 'Detail list'}</button>

				<h2>&nbsp;</h2>

        <Transition in={this.state.shortView} timeout={3000}>

				<div>{this.state.shortView ? (
							<SkillHistorySimpleComponent/>
					) : (
						<div>
							<h3>Base libs & frameworks(detail view)</h3>
							<div className={styl.relative} ref={this.setElement}>
								{/*{this.props.data.show ?<SkillHistoryTileComponent/>: null}*/}
								<SkillHistoryTileComponent/>

								<input type="text" onChange={this.handleSearch} className={styl.input}
											 placeholder="search filter"
											 value={this.props.filterBy}/>
                <ButtonReset in={!!this.props.filterBy} onReset={this.onReset}/>

								<div>
                  <SkillHistoryRulerComponent/>
									<TransitionGroup>
                    {
                      this.props.history.map((item, index) => {
                        return <CSSTransition
													key={item.name}
													classNames='repeat'
													timeout={{enter: 50, exit: 50}}>
													<div className={styl['history-row']}>
														<SkillHistoryItemComponent name={item.name} key={item.name} date={item.date}
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
				</Transition>
			</div>
    )
  }
}