import React, {Component} from 'react';
import styl from './own-project-component.styl'
import {connect} from "react-redux";
import axios from "axios/index";
import {OwnItemProjectComponent} from "./own-item-project-component/own-item-project-component";



@connect((store) => {
  return {
    list: store.ownProjectReducer.list,
  }
})
export default class OwnProjectComponent extends Component{

	constructor(...args){
		super(...args);
    if(!this.props.list.length){
      this.props.dispatch({
        type:'FETCH_OWN_PROJECT',
        payload: axios.get('./cv-json-data/own-project.json')
      });
    }
	}

	render(){
		return(
			<div className={styl['own-component-styl']}>
        {this.props.list.map((item, index)=>{
          return (<OwnItemProjectComponent key={index} data={item}/>)
        })}
			</div>	
			)
	}
}