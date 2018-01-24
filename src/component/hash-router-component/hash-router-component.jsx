import React from 'react';
import styl from "./hash-router-component.styl";
import SkillHistoryComponent from '../skill-history-component/skill-history-component';
import ExperienceComponent from  '../experience-component/experience-component';
import GlComponent from '../gl-component/gl-component'
import Gl2Component from '../gl-2-component/gl-2-component'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import OwnProjectComponent from '../own-project-component/own-project-component'

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  HashRouter,
  Redirect,
  Switch

} from 'react-router-dom';
import ContactComponent from "../contact-component/contact-component";
import {posXY, windowSize} from "../../asset/position";




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
      case  'contact':
        this.childComponent = ContactComponent;
        break;
      case  'gl':
        this.childComponent = GlComponent;
        break;
      case  'rain':
        this.childComponent = Gl2Component;

        break;
      case 'ownproject' :
        this.childComponent = OwnProjectComponent
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
  scrollEl;

  constructor(...args){
    super(...args)
  }

  componentDidMount(e){

    const height = windowSize().height - posXY(this.scrollEl).y
    this.scrollEl.style.height = height+'px'

  }

  render() {
    return (
      <HashRouter >
        <div>
          <ul className={styl['nav-bar']}>
            <li><NavLink to="/itskill" activeStyle={{ background:'#fff' }}>IT skill</NavLink></li>
            <li><NavLink to="/experience" activeStyle={{ background:'#fff' }}>Commercial experience</NavLink></li>
            <li><NavLink to="/ownproject" activeStyle={{ background:'#fff' }}>Own projects</NavLink></li>
            <li><NavLink to="/contact" activeStyle={{ background:'#fff' }}>Contact</NavLink></li>
            {/*<li><NavLink to="/gl" activeStyle={{ background:'#bfe1ff' }}>GL</NavLink></li>*/}
            {/*<li><NavLink to="/rain" activeStyle={{ background:'#bfe1ff' }}>Rain</NavLink></li>*/}
          </ul>
          <div ref={el=>this.scrollEl=el} className={styl.scroll}>
            <Route render = {({location}) => {
              if(location.pathname =='/'){
                return (<Redirect to='/itskill'/>)
              }
              return (
                <div className={styl['route']}>
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
