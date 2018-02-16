import React from 'react';
import TitleComponent from './component/title-component/title-component';
import styl from './app.styl';
import './styl/animation.styl'


import HashRouterComponent from "./component/hash-router-component/hash-router-component";
import {connect, Provider} from "react-redux";
import {getVisibleTodos, ModalComponent} from "./component/modal-component/modal-component";
import {createStore} from "redux";

let store = createStore(getVisibleTodos)

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
        <Provider store={store}>
          <ModalComponent/>
        </Provider>
      </div>
    )
  }

}