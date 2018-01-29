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
    return (
      <div>
        <div className={styl.bookmark}>
          <div>
            <div>
              <a href={data.play_url} target="_blank">
                <img src="./img/play_prism_hlock.png"/>
              </a>

            </div>
          </div>
        </div>
        <div className={styl.overflow} style={{padding: "2px 8px 8px 8px"}}>
          <div className={styl.content}>
            <img className={styl.ico} src={data.ico}/>
            <h2>
              {data.name}
            </h2>
            <div>
              {data.description}
            </div>
            <div className={styl.clear_both}>

            </div>
          </div>

        </div>
      </div>
    )
  }
}