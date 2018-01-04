import React from "react";
import styl from './contact-component.styl';
import defineload from "../../asset/defineload"

const {Component} = React;

const contactData = [
  ['Maxim Lipatov'],
  ['Address', 'Ukraine, Kyiv'],
  ['Phone number', '+38066-593-0939'],
  ['E-mail', 'maximmalyshyn@gmail.com']
];


export default class ContactComponent extends Component{

  /**
   * @type {Promise}
   */
  load;
  /**
   * @type {Node}
   */
  mapEl;

  constructor(...args){
    super(...args)

    this.load = Promise.all([
      defineload('L'),
      defineload('LStyle')
    ])

  }
  componentDidMount(){
    console.log('mount')
    this.load
      .then(([L])=>{
        var mymap = L.map(this.mapEl).setView([50.4, 30.48], 11);
        L.tileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile', {
          maxZoom: 18,
          id: 'examples.map-i875mjb7'
        }).addTo(mymap);
        L.circle([50.39, 30.49], 2000, {
          color: 'transparent',
          fillColor: '#f03',
          fillOpacity: 0.2
        }).addTo(mymap).bindPopup("lmaxim@mail.ru");
      })
  }


  leafletDefine(el){
    this.mapEl = el
  }

  render() {
    return (
      <div className={styl['contact-component']}>
        <table className={styl['contact-table']}>
          <tbody>
          {
            contactData.map((contact, index) => {
              return <tr key={index}>
                {
                  contact.map((item, index2) => {
                    if (index == 0) {
                      return <td colSpan="2" key={index2} className={styl['my-name']}>
                        {item}
                      </td>
                    }
                    return <td key={index2}>
                      {item}
                    </td>

                  })
                }
              </tr>
            })
          }
          </tbody>
        </table>
        <div ref={el => this.leafletDefine(el)} className={styl.map}>
        </div>
      </div>
    )
  }
}
