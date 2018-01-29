import React from 'react';
import SkillHistorySimpleComponent from './skill-history-simple-component/skill-history-simple-component';
import styl from './skill-history-component.styl';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux'
import ContactInfoComponent from '../../component/contact-component/contact-info-component/contact-info-component'
import Transition from 'react-transition-group/Transition';
import {SkillHistoryDetailComponent} from './skill-history-detail-component/skill-history-detail-component'


const transitionDuration = 100;
const defaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
}


const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: {
    width: '100%',
    opacity: 1,
    position: "absolute",
    left: 0,
    top: 0
  },
  exited: { opacity: 0, display: 'none' }
};


const SkillHistory = ({ in: inProp }) => {

  const onExited = (node) => {
    node.style.display = 'none'
  }

  const onEntering = (node) => {
    node.style.display = 'block'
  }

  return (
    <div className={styl.relative}>
      <Transition in={inProp} timeout={transitionDuration} onExited={onExited} onEntering={onEntering}>
        {(state) => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}><SkillHistorySimpleComponent/></div>
        )}
      </Transition>
      <Transition in={!inProp} timeout={transitionDuration} onExited={onExited} onEntering={onEntering}>
        {(state) => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}><SkillHistoryDetailComponent/></div>
        )}
      </Transition>
    </div>
  )
}

@connect((store) => {
  return {
    filterBy: store.skillReducer.filterBy,
    history: store.skillReducer.history,
    filterHistory: store.filterReducer.history,
    data: store.hoverReducer.data
  }
})
export default class SkillHistoryComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      shortView: false
    }
  }

  @autobind
  onSimpleDetailView() {
    this.setState({
      shortView: !this.state.shortView
    })
  }


  render() {
    return (
      <div className={styl.content}>
        <div>
          <ContactInfoComponent/>
        </div>
        <button onClick={this.onSimpleDetailView}>{!this.state.shortView ? 'Simple view' : 'Detail list'}</button>

        <h2>&nbsp;</h2>

        <SkillHistory in={!!this.state.shortView}/>
      </div>
    )
  }
}