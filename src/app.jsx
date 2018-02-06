import React from 'react';
import TitleComponent from './component/title-component/title-component';
import styl from './app.styl';
import './styl/animation.styl'


import HashRouterComponent from "./component/hash-router-component/hash-router-component";
import {connect} from "react-redux";


const stylOverFlow = {
  overflowY:'hidden',
  maxHeight: '100%'
}


@connect((store) => {
  return {
    currentLocation: store.locationReducer.currentLocation,
  }
})
export default class App extends React.Component {
  render() {

    return (
      <div className={styl.content} style={this.props.currentLocation =='/forprint' ? null: stylOverFlow}>
        <TitleComponent/>
        <HashRouterComponent/>
      </div>
    )
  }

}