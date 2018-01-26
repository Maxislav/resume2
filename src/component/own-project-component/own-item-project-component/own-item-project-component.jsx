import React, {Component} from 'react'
import styl from './own-item-project-component.styl'
export class OwnItemProjectComponent extends Component{

  constructor(...args){
    super(...args);
  }

  render(){
    /**
     * @type{Object.<T>}
     * @property {string} ico
     * @property {string} name
     */
    const {data} = this.props
   // console.log(data)
    return(
      <div>
        <img className={styl.ico} src={data.ico}/>
        <h2>
          {data.name}

        </h2>
        <div>
          {data.description}
        </div>
        <div className={styl.clear_both}>
          In progress...
        </div>
      </div>
    )
  }
}