import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import styl from './title-component.styl'
import  {xhrGet} from "../../asset/xhr-get";

export default class TitleComponent extends Component{

    constructor(...args){
      super(...args)
      this.state = {
        version: {}
      }
      xhrGet('./cv-version.json')
        .then(d => {
          const  j = JSON.parse(d)
          this.setState({
            version: j
          })
        })
    }

    render (){
        return (
          <div className={styl.title + " flex"}>
             <img src="./img/favicon.ico"/> <h2>Maxim Lipatov</h2>
              <div className={styl.version}>Release date: {this.state.version.date}</div>
          </div>

        )
    }
};
