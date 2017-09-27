import React from 'react';
import TitleComponent from './component/title-component/title-component';
import SkillHistoryComponent from './component/skill-history-component/skill-history-component';
import appStyl from './app.styl';




export default class App extends React.Component{
    css = appStyl;
    render(){
        return (
            <div className={this.css.content}>
                <TitleComponent/>
                <SkillHistoryComponent/>
            </div>
        )
    }

}