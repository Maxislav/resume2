import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import styl from './title-component.styl'
import  {xhrGet} from "../../asset/xhr-get";

export default class TitleComponent extends Component{

    constructor(...args){
      super(...args)
      this.state = {
        version: {
          date: null
        }
      }
      this.setState = this.setState.bind(this)
      xhrGet('./cv-version.json', 'json')
        .then(version => {
          this.setState({
            version
          })
        })
    }

    render (){
        return (
          <div className={styl.title}>
            <div className={styl.my_name}>
              <img src="./img/favicon.ico"/> <h2>Maxim Lipatov</h2>
            </div>

             <a className={styl.download} href="./Maxim Lipatov.pdf" download="Maxim Lipatov.pdf">Download</a>
             <div className={styl.version}>Release date: {this.state.version.date}</div>
          </div>

        )
    }
};
