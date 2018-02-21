import React, {Component} from 'react'
import className from './modal-component.styl'
import {connect} from 'react-redux'
import {autobind} from "core-decorators";


const duration = 1000;

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

@connect((store) => ({ modal: store.modalReducer }))
export class Mask extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      stylName: 'entering'
    }
  }

  @autobind
  hideAll() {
    this.setState({
      stylName: 'entering'
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'MODAL_HIDE'
      })
      this.props.setTile('inherit')
    }, duration)
  }

  @autobind
  maskInit(e) {
    if (this.props.in) {
      this.props.setTile('full')
      setTimeout(() => {
        this.setState({
          stylName: 'entered'
        })
      })
    }
  }

  componentDidMount() {
   // ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      this.props.in ? <div onClick={this.hideAll}
                           ref={this.maskInit}
                           style={{ ...defaultStyle, ...transitionStyles[this.state.stylName] }}>

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
          <D src={this.props.modal.imgSrc}/>
        </Mask>
      </div>
    )
  }
}

