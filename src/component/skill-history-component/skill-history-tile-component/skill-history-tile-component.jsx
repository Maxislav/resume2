import React from 'react';
import {connect} from "react-redux";
import styl from './skill-history-tile-component.styl';
import {posXY} from '../../../asset/position'

@connect((store) => {
  return {
    data: store.hoverReducer.data
  }
})

//<div>X:{this.props.data.xy.x} Y:{this.props.data.xy.y} show: {this.props.data.show.toString()}</div>
export default class SkillHistoryTileComponent extends React.Component {

  constructor(props){
    super(props)
  }

  getStyle(){
    return {
      background: 'red'
    }
  }

  render() {
    const parentPosition = this.props.data.parentEl ? posXY(this.props.data.parentEl) : 0
    const left = this.props.data.xy.x -parentPosition.x+ 'px';
    const top = this.props.data.xy.y - parentPosition.y - 40 +'px';
    const display = this.props.data.show ? 'block' : 'none'
    return(
      <div className={styl.absolute}  style={{left, top, display}}>
        {left} {top} {this.props.data.show.toString()}
      </div>
    )
  }
}