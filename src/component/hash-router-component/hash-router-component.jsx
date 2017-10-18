import React from 'react';
import hashRouterComponentStyl from "./hash-router-component.styl";
import SkillHistoryComponent from '../skill-history-component/skill-history-component';
import ExperienceComponent from  '../experience-component/experience-component';
import { CSSTransition } from 'react-transition-group'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  HashRouter,
  Redirect,

} from 'react-router-dom';

console.log(CSSTransition)


class DefaultComponent extends React.Component{
  constructor(...args){
    super(...args)
    console.log(this.props)
  }
  render(){
    return(
      <Redirect to='/itskill'/>
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
          </ul>

            <Route exact path="/itskill" component={SkillHistoryComponent}/>
            <Route exact path="/experience" component={ExperienceComponent}/>
            <Route exact path="/" component={DefaultComponent}/>

        </div>
      </HashRouter>

    )
  }
}
