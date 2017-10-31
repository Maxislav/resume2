import React from 'react';
import hashRouterComponentStyl from "./hash-router-component.styl";
import SkillHistoryComponent from '../skill-history-component/skill-history-component';
import ExperienceComponent from  '../experience-component/experience-component';
import GlComponent from '../gl-component/gl-component'
import Gl2Component from '../gl-2-component/gl-2-component'
import { TransitionGroup, CSSTransition } from 'react-transition-group';


import {
  BrowserRouter as Router,
  Route,
  NavLink,
  HashRouter,
  Redirect,
  Switch

} from 'react-router-dom';




class DefaultComponent extends React.Component{
  constructor(...args){
    super(...args)
    this.childComponent = SkillHistoryComponent

  }
  render(p){
    //console.log(this.props.match.params.l)
    switch (this.props.match.params.l){
      case 'experience':
        this.childComponent =  ExperienceComponent;
        break;
      case  'itskill':
        this.childComponent = SkillHistoryComponent;
        break;
      case  'gl':
        this.childComponent = GlComponent;
        break;
      case  'rain':
        this.childComponent = Gl2Component;
        break;
      default:
        return(<Redirect to='/itskill'/>)
        //this.childComponent = SkillHistoryComponent
    }
    return(
      <Route exact path={this.props.location.pathname} component={this.childComponent}/>
    )
  }
}





export default class HashRouterComponent extends React.Component{
  css = hashRouterComponentStyl;
  constructor(...args){
    super(...args)
  }
  render() {
    return (
      <HashRouter >
        <div>
          <ul className={this.css['nav-bar']}>
            <li><NavLink to="/itskill" activeStyle={{ background:'#bfe1ff' }}>IT skill</NavLink></li>
            <li><NavLink to="/experience" activeStyle={{ background:'#bfe1ff' }}>Experience</NavLink></li>
            <li><NavLink to="/gl" activeStyle={{ background:'#bfe1ff' }}>GL</NavLink></li>
            <li><NavLink to="/rain" activeStyle={{ background:'#bfe1ff' }}>Rain</NavLink></li>
          </ul>
          <div >
            <Route render = {({location}) => {
              if(location.pathname =='/'){
                return (<Redirect to='/itskill'/>)
              }
              return (
                <div className={this.css['route']}>
                  <TransitionGroup>
                    <CSSTransition
                      key={location.pathname || 'olol'}
                      classNames='fade'
                      timeout={{ enter: 500, exit: 500}}>
                      <Route location={location} key={location.pathname} path="/:l" component={DefaultComponent} />
                    </CSSTransition>
                  </TransitionGroup>
                </div>
            )}}/>
          </div>
        </div>
      </HashRouter>

    )
  }
}
