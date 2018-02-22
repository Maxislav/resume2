import React, {Component} from 'react'
import className from './modal-component.styl'
import {connect} from 'react-redux'
import {autobind} from "core-decorators";
import {Dialog} from "./dialog-component/dialog-component";


const duration = 300;

const stylSize = {
  inherit: {
    width: 'inherit',
    height: 'inherit',
  },
  full: {
    width: '100%',
    height: '100%',
  }
}

 const defaultStyle = {
   transition: `opacity ${duration}ms ease-in-out`,
   opacity: 1,
   background: 'rgba(0,0,0,0.3)',
   ...stylSize.full
 }




@connect((store) => ({ modal: store.modalReducer }))
export class Mask extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      styleKey: 'entering',
      style: {
        opacity: 0
      }
    }

    this.prevIn = this.props.in
  }

  @autobind
  hideAll() {
    this.setState({
      style: {
        opacity: 0
      }
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'MODAL_HIDE'
      })
      this.props.setTile('inherit')
    }, duration)
  }


  componentDidMount() {
    this.isInUpdate(this.props.in)
  }

  componentDidUpdate(){
    this.isInUpdate(this.props.in)
  }

  componentWillReceiveProps(nextProps) {
   // console.log('nextProps', nextProps, this.props.in)
    //this.isInUpdate(nextProps)
  }

  isInUpdate(next){
    if(this.prevIn !== next){
      const prev = this.prevIn
      this.prevIn = next

      this.onMountUpdate(next, prev)
      return true
    }
    return false
  }

  onMountUpdate(nextIn, prevIn){
    if (nextIn){
      this.props.setTile('full')
      setTimeout(() => {
        this.setState({
          style: {
            opacity: 1
          }
        })
      })
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      this.props.in ? <div onClick={this.hideAll} style={{ ...defaultStyle, ...this.state.style }}>
        {this.props.children}
      </div> : null
    )

  }
}


@connect((store) => ({ modal: store.modalReducer }))
export class ModalComponent extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      styleName: 'inherit'
    }
  }

  @autobind
  setTile(name){
    this.setState({
      styleName: name
    })
  }

  render(){
    return(
      <div className={className.component} style={stylSize[this.state.styleName]} >
        <Mask in={this.props.modal.isShow} setTile={this.setTile}>
          <Dialog src={this.props.modal.src} duration={duration}/>
        </Mask>
      </div>
    )
  }
}

