import React from 'react';
import TitleComponent from './component/title-component/title-component';
import SkillHistoryComponent from './component/skill-history-component/skill-history-component';
import appStyl from './app.styl';


import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from 'react-router-dom'


export default class App extends React.Component{
    css = appStyl;
    render(){
        return (
            <div className={this.css.content}>
                <TitleComponent/>
                <HashRouter>
                  <div>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/topics">Topics</Link></li>
                    </ul>
                    <hr/>
                    <Route exact path="/" component={SkillHistoryComponent}/>
                    <Route exact path="/about" component={SkillHistoryComponent}/>
                  </div>
                </HashRouter>
            </div>
        )
    }

}