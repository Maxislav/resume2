import React, {Component} from "react"
import styl from './experience-component.styl'
import {connect} from 'react-redux'
import axios from 'axios'
import ExperienceItemComponent from './experience-item-component/experience-item-component'
import {posXY, windowSize} from "../../asset/position";

const stylClearPadding = {
  padding: '10px '
};

@connect((store) => {
  return {
    list: store.experienceReducer.list,
  }
})
export class ExperienceComponent extends Component {

  isLocationDefine = false

  constructor(...args) {
    super(...args)
    this.isLocationDefine = !!this.props.location
  }


  componentDidMount(e) {
    this.props.dispatch({
      type: 'FETCH_EXPERIENCE',
      payload: axios.get('cv-json-data/experience.json')
    });

    if (this.isLocationDefine) {
      const height = windowSize().height - posXY(this.scrollEl).y
      this.scrollEl.style.height = height + 'px'
    }
  }


  render() {
    return (
      <div className={styl.component} ref={el => this.scrollEl = el} style={this.isLocationDefine ? null :stylClearPadding}>
        {this.props.list.map((item, index) => {
          return (<ExperienceItemComponent data={item} key={index}/>)
        })}
      </div>
    )
  }
}