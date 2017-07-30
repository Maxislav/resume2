import React from 'react';
import TitleComponent from './component/title-component/title-component';
import SkillHistoryComponent from './component/slill-history-component/slill-history-component'
import appStyl from './app.styl'

export default class App extends React.Component{
    render(){
        return (
            <div className={appStyl.content}>
                <TitleComponent/>
                <SkillHistoryComponent/>
            </div>
        )
    }

}