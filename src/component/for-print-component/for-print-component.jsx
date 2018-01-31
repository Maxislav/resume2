import React, {Component} from 'react'
import {connect} from "react-redux";
import axios from "axios/index";
import styl from "./for-print-component.styl"
import {ContactInfoComponent} from "../contact-component/contact-info-component/contact-info-component";
import {SkillHistorySimpleComponent} from "../skill-history-component/skill-history-simple-component/skill-history-simple-component";
import {ExperienceComponent} from "../experience-component/experience-component";
import {OwnProjectComponent} from "../own-project-component/own-project-component";


@connect((store) => {
  return {
    skillList: store.skillReducer.history,
    ownProjectList: store.ownProjectReducer.list,
  }
})
export class ForPrintComponent extends Component{

  constructor(...args){
    super(...args);
    if(!this.props.ownProjectList.length){
      this.props.dispatch({
        type:'FETCH_OWN_PROJECT',
        payload: axios.get('./cv-json-data/own-project.json')
      });
    }
    if(!this.props.skillList.length){
      this.props.dispatch({
        type:'FETCH_HISTORY',
        payload: axios.get('./cv-json-data/skill-history.json')
      });
    }
  }

  render(){
    return(
      <div className={styl["for-print-component"]}>
        <ContactInfoComponent/>
        <SkillHistorySimpleComponent/>
        <ExperienceComponent/>
        <OwnProjectComponent/>
      </div>
    )
  }
}