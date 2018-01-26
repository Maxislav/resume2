import React from "react"
import styl from './experience-component.styl'
import {connect} from 'react-redux'
import axios from 'axios'
import ExperienceItemComponent from './experience-item-component/experience-item-component'

@connect((store) => {
  return {
  	list: store.expirienceReducer.list,
	}
})
export default class ExperienceComponent extends React.Component{

	componentDidMount(e){
	    this.props.dispatch({
	      type:'FETCH_EXPIRIENCE',
	      payload: axios.get('cv-json-data/expirience.json')
	    });
		
	}
  render(){
    return (
      <div className={styl['experience-component']}>
       	{this.props.list.map((item, index)=>{
       		return(<ExperienceItemComponent data={item} key={index}/>)
       	})}
      </div>
    )
  }
}