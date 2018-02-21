import React, {Component} from 'react'
import styl from './own-item-project-component.styl'
import {connect} from 'react-redux'
import {autobind} from "core-decorators";

/**
 *
 * @param {Object}data
 * @property {Array} descriptionList
 * @return {*}
 */
const Description = ({ data }) => {
  if (data.descriptionList && data.descriptionList.length) {
    return (
      <div>
        <div>
          {data.description}
        </div>
        <div style={{ clear: "left" }}>
          <h3>
            Purpose:
          </h3>
          <ul className={styl.ul}>
            {data.descriptionList.map((item, index) => (<li key={index}>{item}</li>))}
          </ul>
        </div>

      </div>)
  }
  return (<div>{data.description}</div>)
}
/**
 *
 * @param {Object}data
 * @property {string} play_url
 * @return {*}
 */
const PlayPrism = ({ data }) => {
  if (data.play_url) {
    return (
      <div className={styl.play_prism}>
        <a href={data.play_url} target="_blank">
          <img src="./img/play_prism_hlock.png"/>
        </a>
      </div>
    )
  }
  return null
}
const Libs = ({ data: list }) => {
  if (list)
    return (<div>
      <h3> Main Frameworks:</h3>
      <ul className={styl.ul}>

        {list.map((it, index) => (<li key={index}>{it}</li>))}
      </ul>

    </div>)
  return null
}




@connect((store)=>({modal: store.modalReducer}))
export class OwnItemProjectComponent extends Component {

  constructor(...args) {
    super(...args);
  }


  @autobind
  showModal(el, src){
    this.props.dispatch({
      type: 'MODAL_SHOW',
      src: {
        el,
        url: src
      }
    })
  }

  render() {
    /**
     * @type{Object.<T>}
     * @property {string} ico
     * @property {string} name
     */
    const { data } = this.props
    return (
      <div className={styl.component}>
        <div className={styl.bookmark}>
          <div>
            <div>
              <a href={data.web_url || data.play_url} target="_blank">
                <h3>{data.name}</h3>
              </a>
            </div>
          </div>
        </div>
        <div className={styl.overflow} style={{ padding: "2px 8px 8px 8px" }}>
          <div className={styl.content}>
            <div className={styl.app_name}>
              <h2>
                {data.scope}
              </h2>
              <PlayPrism data={data}/>
            </div>
            <img className={styl.mainImage} src={data.mainImg} onClick={e=>this.showModal(e.target, data.mainImg)}/>
            <img className={styl.ico} src={data.ico}/>
            <Description data={data}/>
            <Libs data={data.libs}/>
            <div className={styl.git}>
              <h3>
                Git: <a href={data.git_url}>{data.git_url}</a>
              </h3>
            </div>
            <div className={styl.imgs}>
              {data.imgs.map((item, index) => (
                <img src={item} key={index}  onClick={e=>this.showModal(e.target, item)}/>
              ))}
            </div>
            <div className={styl.clear_both}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}