import React, {Component} from 'react'
import styl from './modal-component.styl'
import { connect} from 'react-redux'
import { createStore } from 'redux'

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}


export class Modal extends Component{
  constructor(...args){
    super(...args)
    console.log(this)
  }
  render(){
    return(
      <div className={styl.component}>
      </div>
    )
  }
}

const st ={
  todos: [],
  visibilityFilter: false
}

const mapStateToProps = (state = st) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

export const ModalComponent = connect(
  mapStateToProps,
)(Modal)

