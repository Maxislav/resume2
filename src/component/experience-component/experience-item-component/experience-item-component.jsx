import React, {Component} from 'react'
import dateFormat from 'dateformat'
import styl from './experience-item-component.styl'


/**
 *
 * @param {Date|null}date
 */
const getDataStr = (date) =>{
  if(date){
    return dateFormat(date,'mmmm dS, yyyy' )
  }
  return 'Present time'
}


export default class ExperienceItemComponent extends Component{
  render(){
    return(
      <div className={styl.container}>
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
        <div className={styl['row']}>
          <div>
            Responsibility:
          </div>
          <div>
            {this.props.data.responsibility}
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
      </div>
    )
  }
}