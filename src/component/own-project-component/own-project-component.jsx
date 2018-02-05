import React, {Component} from 'react';
import styl from './own-project-component.styl'
import {connect} from "react-redux";
import axios from "axios/index";
import {OwnItemProjectComponent} from "./own-item-project-component/own-item-project-component";
import {posXY, windowSize} from "../../asset/position";



@connect((store) => {
  return {
    list: store.ownProjectReducer.list,
  }
})
export class OwnProjectComponent extends Component{

	constructor(...args){
		super(...args);
    if(!this.props.list.length){
      this.props.dispatch({
        type:'FETCH_OWN_PROJECT',
        payload: axios.get('./cv-json-data/own-project.json')
      });
    }
	}
  componentDidMount(e){
    if (this.props.location) {
      const height = windowSize().height - posXY(this.scrollEl).y
      this.scrollEl.style.height = height+'px'
    }

  }

	render(){
		return(
			<div className={styl.component} ref={el=>this.scrollEl=el}>
        {this.props.list.map((item, index)=>{
          return (<OwnItemProjectComponent key={index} data={item}/>)
        })}
			</div>	
			)
	}
}