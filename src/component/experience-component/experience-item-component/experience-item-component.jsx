import React, {Component} from 'react'
import dateFormat from 'dateformat'
import styl from './experience-item-component.styl'
import {NormalDate} from "../../../asset/normal-date";
import {autobind} from "core-decorators";
import {connect} from "react-redux";


/**
 *
 * @param {Date|null}date
 */
const getDataStr = (date) =>{
  if(date){
    try {
      return dateFormat(new NormalDate(date),'mmmm dS, yyyy' )
    }catch(err) {
      return 'err '+ date
    }

  }
  return 'Present time'
}

@connect((store)=>({modal: store.modalReducer}))
class ImgContainer extends Component{
  @autobind
  showModal(el, src){
    this.props.dispatch({
      type: 'MODAL_SHOW',
      src: {
        el,
        url: src
      }
    })
  }

  render (){
    const {img} = this.props
    if(img){
      return (
        <img src={img} onClick={e=>this.showModal(e.target, img)}/>
      )
    }else return null
  }
}




export default class ExperienceItemComponent extends Component{



  render(){
    return(
      <div className={styl.container}>
        <div className={styl.img}>
          <ImgContainer img={this.props.data.img}/>
        </div>
        <div className={styl['row']}>
          <div>
            Period:
          </div>
          <div className={styl['date-container']}>
            {this.props.data.date.map((item, index) => (
              <div key={index}>{getDataStr(item)} {index==0 ?'-': null}</div>
            ))}
          </div>
        </div>
        <div className={styl.row}>
          <div>Company:</div>
          <div>
            {this.props.data.company}
          </div>

        </div>
        <div className={styl['row']}>
          <div>
            Position:
          </div>
          <div>
            {this.props.data.position}
          </div>

        </div>
        <div className={styl['row']}>
          <div>
            Subject:
          </div>
          <div>
            {this.props.data.subject}
          </div>
        </div>

        <div className={styl.row}>
          <div>
            Purpose:
          </div>
          <div>
            <ul className={styl.list}>
              {this.props.data.purpose.map( (item, index)=>(<li key={index}>{item}</li>) )}
            </ul>
          </div>
        </div>
        <div className={styl.row}>
          <div>
            Main Frameworks:
          </div>
          <div>
            <ul className={styl.list}>
              {this.props.data.libs.map( (item, index)=>(<li key={index}>{item}</li>) )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}