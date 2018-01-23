import React from 'react';
import {connect} from "react-redux";
import styl from './skill-history-tile-component.styl';
import {posXY} from '../../../asset/position'
import {autobind} from "core-decorators";


const toYearMonthDay = (ms) => {
  const y = 365 * 24 * 3600 *1000
  const m = 30 * 24 * 3600 *1000
  const d = 24 * 3600 * 1000

  const YY = Math.floor(ms/y);
  const MM = Math.floor((ms - (YY*y))/m)

  const DD = Math.floor((ms - (YY*y) - (MM*m))/d)

  return {
    YY,
    MM,
    DD
  }
}

class Ymonthday extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className={styl.ymonthday}>
        {toYearMonthDay(this.props.period).YY ? <div> {toYearMonthDay(this.props.period).YY}years </div> : null }
        {toYearMonthDay(this.props.period).MM ? <div> {toYearMonthDay(this.props.period).MM}months </div> : null }
        {toYearMonthDay(this.props.period).DD ? <div> {toYearMonthDay(this.props.period).DD}days </div> : null }
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
    console.log(item)

    let period = 0;
    if(item){
      const t2 =  item[1] ? new  Date(item[1]) : new Date()
      const t1 =  item[0] ? new  Date(item[0]) : new Date()
      period = t2.getTime() - t1.getTime()
    }

    return(
      <div className={styl.absolute}  style={{left, top, display}} ref={el=>this.transformPosition(el, left)}>
        <Ymonthday period={period}/>

      </div>
    )
  }
}