import React, {Component} from 'react'
import className from './modal-component.styl'
import {connect} from 'react-redux'
import {autobind} from "core-decorators";
import {Transition} from "react-transition-group";

const transitionDelay = 2

const duration = 300;

const stylSize = {
  full: {
    width: '100%',
    height: '100%',
  }
}

 const defaultStyle = {
   transition: `opacity ${duration}ms ease-in-out`,
   opacity: 0,
   background: 'rgba(0,0,0,0.3)',
   ...stylSize.full
 }

 const transitionStyles = {
     entering: { opacity: 0 },
     entered:  { opacity: 1 },
   };

const D = ({ src }) => {
  return (
    <div className={className.dialog}>
      <div>
        {src}
      </div>
      <div>
        In develop progress
      </div>
    </div>
  )
}
let key = 0

@connect((store) => ({ modal: store.modalReducer }))
export class Mask extends Component {
  constructor(...args) {
    super(...args)


  }

  @autobind
  hideAll() {
    this.props.dispatch({
      type: 'MODAL_HIDE'
    })

  }


  @autobind
  maskInit(e) {

    console.log('maskInit', this.props.isShow)

  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    console.log(this.props)
    return (
      <Transition in={this.props.in} timeout={duration}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }} onClick={this.hideAll}>
            <D src={this.props.modal.imgSrc}/>
          </div>
        )}
      </Transition>
    )
    return null
  }
}


@connect((store) => ({ modal: store.modalReducer }))
export class ModalComponent extends Component {
  constructor(...args){
    super(...args)
  }
  render(){
    const {isShow} = this.props.modal
    return(
      <div className={className.component} style={isShow ? stylSize.full : null}>
        <Mask in={this.props.modal.isShow}/>
      </div>
    )
  }
}

