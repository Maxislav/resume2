import React, {Component} from 'react'

const duration = 300


/**
 * @example
 * <NgIfComponent ngIf={this.state.showOlolo} duration={3000} transitionStyle={ngIfStyle}>
     <div>
     Ololo
     </div>
 </NgIfComponent>
 */

export const ngIfStyle = {
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
Object.freeze(ngIfStyle)

const noop = () => {}

export class NgIfComponent extends Component {

  static get callback(){
    return {
      onEnter: noop,
      onEnterActive: noop,
      onEnterFinish: noop,
      onLeave: noop,
      onLeaveActive: noop,
      onLeaveFinish: noop
    }
  }

  constructor(...args) {
    super(...args)
    this.style = this.props.transitionStyle || { ...ngIfStyle }
    this.ngIf = false
    this.duration = this.props.duration || duration
    this.style.initial = this.style.initial || { transition: `all ${this.duration}ms` }
    this.state = {
      ngIf: false,
      style: this.style.initial
    }
    this.callback = { ...NgIfComponent.callback, ...this.props}

  }


  onEnter() {
    this.setState({
      ngIf: true
    })
    this.setState({
      style: { ...this.state.style, ...this.style.enter }
    })
    this.callback.onEnter();
    this.onEnterActive()
  }

  onEnterActive() {
    setTimeout(() => {
      this.setState({
        style: { ...this.state.style, ...this.style.enterActive }
      })
      this.callback.onEnterActive();
      setTimeout(()=>{
        this.callback.onEnterFinish()
      }, this.duration)
    })
  }

  onLeave() {
    this.setState({
      style: { ...this.state.style, ...this.style.leave }
    })
    this.callback.onLeave()
    this.onLeaveActive()
  }

  onLeaveActive() {
    setTimeout(() => {
      this.setState({
        style: { ...this.state.style, ...this.style.leaveActive }
      })
      setTimeout(() => {
        this.onHide()
      }, this.duration)
      this.callback.onLeaveActive()
    })
  }

  onHide() {
    this.setState({
      ngIf: false
    })
    this.callback.onLeaveFinish()
  }

  onChange(nextNgIf) {
    if (this.ngIf !== nextNgIf) {
      this.ngIf = nextNgIf
      if (this.ngIf) this.onEnter()
      else this.onLeave()
    }
  }

  componentDidMount() {
    this.onChange(this.props.ngIf)
  }

  componentDidUpdate() {
    this.onChange(this.props.ngIf)
  }

  render() {
    return (
      this.state.ngIf
        ? <div style={{ ...this.state.style }}>
          {this.props.children}
        </div>
        : null
    )
  }

}