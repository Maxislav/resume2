import React from 'react';
import { autobind } from 'core-decorators';
import glComponentStyl from './gl-component.styl';
import HelloCanvas from './hello-canvas'

export default class GlComponent extends React.Component {


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
      new HelloCanvas(this.canvasEl)
    }
  }


  render() {
    return (
      <div ref={this.setContainer} className={glComponentStyl.container}>
        <canvas ref={this.setCanvas} className={glComponentStyl.canvas}/>
      </div>

    )
  }
}