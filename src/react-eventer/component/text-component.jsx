import React, {Component} from 'react'
import {eventdecorator} from "../max-eventer";
import {eventContact} from "../my-events";


@eventdecorator(
  eventContact,
  [
    'time'
  ]
)
export class MyInfoText extends Component {

  constructor(...args) {
    super(...args)
    this.timer = null
  }

  componentDidMount() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        eventContact.emit('time', new Date().toISOString())
      }, 1000)
    }

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (<div>Current date</div>)
  }
}