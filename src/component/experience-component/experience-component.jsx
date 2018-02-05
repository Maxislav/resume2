import React, {Component} from "react"
import styl from './experience-component.styl'
import {connect} from 'react-redux'
import axios from 'axios'
import ExperienceItemComponent from './experience-item-component/experience-item-component'
import {posXY, windowSize} from "../../asset/position";

@connect((store) => {
  return {
    list: store.experienceReducer.list,
  }
})
export class ExperienceComponent extends Component {
  constructor(...args) {
    super(...args)
  }


  componentDidMount(e) {
    this.props.dispatch({
      type: 'FETCH_EXPERIENCE',
      payload: axios.get('cv-json-data/experience.json')
    });

    if (this.props.location) {
      const height = windowSize().height - posXY(this.scrollEl).y
      this.scrollEl.style.height = height + 'px'
    }
  }


  render() {
    return (
      <div className={styl.component} ref={el => this.scrollEl = el}>
        {this.props.list.map((item, index) => {
          return (<ExperienceItemComponent data={item} key={index}/>)
        })}
      </div>
    )
  }
}