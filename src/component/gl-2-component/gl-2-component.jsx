import React from 'react';
import { autobind } from 'core-decorators';
import RainCanvas from './rain-canvas';
import gl2ComponentStyl from './gl-2-component.styl';



export default class Gl2Component extends React.Component {


  constructor(...args){
    super(...args)
    this.width = 0;
    this.height = 600;
    this.canvasEl = null;
    this.containerEl = null;
  }



  @autobind
  setCanvas(el){
    this.canvasEl = this.canvasEl || el
  }

  @autobind
  setContainer(el) {
    this.containerEl = this.containerEl || el;
  }

  componentDidMount(){


    if(this.canvasEl){
      this.canvasEl.width = this.containerEl.offsetWidth;
      this.canvasEl.height = this.canvasEl.width * 0.75;
      new RainCanvas(this.canvasEl)
    }
  }


  render() {
    return (
      <div ref={this.setContainer} className={gl2ComponentStyl.container}>
        <canvas ref={this.setCanvas} className={gl2ComponentStyl.canvas}/>
      </div>

    )
  }
}