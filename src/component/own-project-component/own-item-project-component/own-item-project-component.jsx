import React, {Component} from 'react'
import styl from './own-item-project-component.styl'

const Description = ({ data }) => {
  if (data.descriptionList && data.descriptionList.length) {
    return (
      <div>
        <div>
          {data.description}
        </div>
        <ul className={styl.ul}>
          {data.descriptionList.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>)
  }
  return (<div>{data.description}</div>)
}

export class OwnItemProjectComponent extends Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    /**
     * @type{Object.<T>}
     * @property {string} ico
     * @property {string} name
     */
    const { data } = this.props
    // console.log(data)
    return (
      <div className={styl.component}>
        <div className={styl.bookmark}>
          <div>
            <div>
              <a href={data.play_url} target="_blank">
                <h2>{data.name}</h2>
              </a>
            </div>
          </div>
        </div>
        <div className={styl.overflow} style={{ padding: "2px 8px 8px 8px" }}>
          <div className={styl.content}>
            <h2>
              {data.scope}
            </h2>
            <img className={styl.mainImage} src={data.mainImg}/>
            <img className={styl.ico} src={data.ico}/>
            <Description data={data}/>
            <div>
              <h3>
                Git: <a href={data.git_url}>{data.git_url}</a>
              </h3>
            </div>
            <div className={styl.play_prism}>
              <a href={data.play_url} target="_blank">
                <img src="./img/play_prism_hlock.png"/>
              </a>
            </div>
            <div className={styl.imgs}>
              {data.imgs.map((item, index) => (
                <img src={item} key={index}/>
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