import React, {Component} from 'react'

const duration = 300


/**
 * @example
 * <NgIfComponent ngIf={this.state.showOlolo} duration={3000}>
     <div>
        Ololo
     </div>
  </NgIfComponent>
 */

const style = {
 /* initial: {
    transition: `all ${300}ms`
  },*/
  enter: {
    opacity: 0
  },
  enterActive: {
    opacity: 1
  },
  leave: {
    opacity: 1
  },
  leaveActive: {
    opacity: 0
  }
}


export class NgIfComponent extends Component{
  constructor(...args){
    super(...args)

    this.style = this.props.activeStyle || {...style}


    this.ngIf = false
    this.duration = this.props.duration || duration
    this.style.initial = {transition : `all ${this.duration}ms`}
    this.state = {
      ngIf: false,
      style: this.style.initial
    }
  }

  onEnter(){
    this.setState({
      ngIf: true
    })
    this.setState({
      style: {...this.state.style,...this.style.enter}
    })
    this.onEnterActive()
  }

  onEnterActive(){
    setTimeout(()=>{
      this.setState({
        style: {...this.state.style,...this.style.enterActive}
      })
    })
  }

  onLeave(){
    this.setState({
      style: {...this.state.style,...this.style.leave}
    })
    this.onLeaveActive()
  }

  onLeaveActive(){
    setTimeout(()=>{
      this.setState({
        style: {...this.state.style,...this.style.leaveActive}
      })
      setTimeout(()=>{
        this.onHide()
      }, this.duration )
    })
  }

  onHide(){
    this.setState({
      ngIf: false
    })
  }

  onChange(nextNgIf){
    if(this.ngIf!==nextNgIf){
      this.ngIf = nextNgIf
      console.log('changeTo', this.ngIf )
      if(this.ngIf) this.onEnter()
      else this.onLeave()
    }
  }

  componentDidMount(){
    this.onChange(this.props.ngIf)
  }

  componentDidUpdate(){
    this.onChange(this.props.ngIf)
  }

  render(){
    return(
      this.state.ngIf ?
      <div style={{...this.state.style}}>
        {this.props.children}
      </div>
        : null
    )
  }

}