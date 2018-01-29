import React from 'react';
import {connect} from "react-redux";
import styl from './skill-history-tile-component.styl';
import {posXY} from '../../../asset/position'
import {autobind} from "core-decorators";
import {NormalDate, toYearMonthDay} from "../../../asset/normal-date";



class Ymonthday extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
    const {period} = this.props;
    return(
      <div className={styl.ymonthday}>
        {toYearMonthDay(period).YY ? <div> {toYearMonthDay(period).YY}years </div> : null }
        {toYearMonthDay(period).MM ? <div> {toYearMonthDay(period).MM}months </div> : null }
        {toYearMonthDay(period).DD ? <div> {toYearMonthDay(period).DD}days </div> : null }
      </div>
    )
  }
}


@connect((store) => {
  return {
    data: store.hoverReducer.data
  }
})
export default class SkillHistoryTileComponent extends React.Component {

  constructor(props){
    super(props)
  }

  getStyle(){
    return {
      background: 'red'
    }
  }

  @autobind
  transformPosition(el, left){
   if(el) {
     if( (el.parentElement.offsetWidth - el.offsetWidth - parseInt(left))<0  ) {
       el.style.left  = parseInt(left) - el.offsetWidth + 'px';

     }
   }
  }

  render() {
    const parentPosition = this.props.data.parentEl ? posXY(this.props.data.parentEl) : 0
    const left = this.props.data.xy.x -parentPosition.x+ 'px';
    const top = this.props.data.xy.y - parentPosition.y - 40 +'px';
    const display = this.props.data.show ? 'block' : 'none';

    const { item } = this.props.data

    let period = 0;
    if(item){
      const t2 =  item[1] ? new  NormalDate(item[1]) : new Date()
      const t1 =  item[0] ? new  NormalDate(item[0]) : new Date()
      period = t2.getTime() - t1.getTime()
    }

    return(
      <div className={styl.absolute}  style={{left, top, display}} ref={el=>this.transformPosition(el, left)}>
        <Ymonthday period={period}/>
      </div>
    )
  }
}