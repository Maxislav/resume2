import React, {Component} from 'react'
import {eventdecorator} from "../max-eventer";
import {eventContact} from "../my-events";
import {MyInfoText} from "./text-component";




@eventdecorator(
  eventContact,
  [
    'time'
  ]
)
export class EventerComponent extends Component{

  render(){
    return (<div>
      {this.state.time}
      <MyInfoText/>
    </div>)
  }
}



