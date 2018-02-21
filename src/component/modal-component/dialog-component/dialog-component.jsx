import React, {Component} from 'react'
import className from './dialog-component.styl'
import {autobind} from "core-decorators";
import {posXY, windowSize} from "../../../asset/position";

const maxKeySize = 0.8;

export class Dialog extends Component{

  state = {
    style:{}
  };

  bigStyle = {};

  mount = 0;

  constructor(...args){
    super(...args);
    const {el} = this.props.src;
    const { width, height } = el;

    const { width: winWidth, height: winHeight } = windowSize();

    const {x: left, y: top} = posXY(el)

    const j = (winWidth/winHeight) - (width/height);

    let w = 0, h = 0;
    if (j < 0) {
      w = maxKeySize*winWidth;
      h = w * height/width;
    } else {
      h = maxKeySize * winHeight;
      w = h * width/height;
    }

    this.bigStyle.width = String(w).concat('px')
    this.bigStyle.height = String(h).concat('px')
    this.bigStyle.left = String((winWidth - w)/2).concat('px')
    this.bigStyle.top = String((winHeight - h)/2).concat('px')

    this.style = {
      transition: 'all 0.5s',
      width: String(width).concat('px'),
      height: String(height).concat('px'),
      left,
      top
    };
  }

  componentWillReceiveProps(nextProps){

  }

  componentDidMount(){
    this.mount = 1
  }

  componentWillUnmount(){
    this.mount = 2
  }

  get isMounted(){
    return this.mount === 1
  }

  @autobind
  initComponent(){

    setTimeout(()=>{
      if (this.isMounted){
        this.setState({
          style: this.bigStyle
        })
      }

    })
  }


  render(){
    const {src}= this.props
    return (
      <div className={className.component} style={{...this.style, ...this.state.style}} ref={this.initComponent}>
        <img src={src.url} className={className.image}/>
      </div>
    )
  }
}