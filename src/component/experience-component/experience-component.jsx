import React from "react"
import styl from './experience-component.styl'
import {connect} from 'react-redux'
import axios from 'axios'
import ExperienceItemComponent from './experience-item-component/experience-item-component'

@connect((store) => {
  return {
  	list: store.experienceReducer.list,
	}
})
export class ExperienceComponent extends React.Component{

	componentDidMount(e){
	    this.props.dispatch({
	      type:'FETCH_EXPERIENCE',
	      payload: axios.get('cv-json-data/experience.json')
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