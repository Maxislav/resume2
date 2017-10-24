import React from 'react';
import TitleComponent from './component/title-component/title-component';
import appStyl from './app.styl';
import './styl/animation.styl'



import HashRouterComponent from "./component/hash-router-component/hash-router-component";


export default class App extends React.Component{
    css = appStyl;
    render(){
        return (
            <div className={this.css.content}>
                <TitleComponent/>
                <HashRouterComponent/>
            </div>
        )
    }

}