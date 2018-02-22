import React, {Component} from "react";
import styl from  './contact-info-component.styl'
import {xhrGet} from "../../../asset/xhr-get";

const $contact = []
const $education = []


const A = ({text}) =>{
  const matches = text.match(/^https?/)
  if(matches){
    return (<a href={text} target='_blank'>{text}</a>)
  }
  return (<span>{text}</span>)
}


export class ContactInfoComponent extends React.Component{

  constructor(...args){
    super(...args)
    this.state = {
      contact: $contact,
      education: $education
    };

    if(!$contact.length){
      xhrGet('./cv-json-data/contact.json', 'json')
        .then(contact => {
          contact.map(item=>$contact.push(item))
          this.setState({
            contact
          })
        })
      xhrGet('./cv-json-data/education.json', 'json')
        .then(contact => {
          contact.map(item=>$education.push(item))
          this.setState({
            education: $education
          })
        })
    }

  }

  render() {
    return (
      <div>

        <table className={styl['contact-table']}>
          <tbody>
          {
            this.state.contact.map((contact, index) => {
              return <tr key={index}>
                {

                  contact.map((item, index2) => {
                    if (index == 0) {
                      return <td colSpan={contact.length == 2 ? 1 : 2} key={index2} className={styl['my-name']}>
                        {item}
                      </td>
                    }
                    return <td key={index2}>
                      <A text={item}/>
                    </td>
                  })
                }
              </tr>
            })
          }
          </tbody>
        </table>
        <div className={styl.education}>
          <h3>
            Education
          </h3>
          <div>
            {this.state.education.map((it, index)=>(<div key={index}>{it}</div>))}
          </div>
        </div>
        <div>

        </div>
      </div>

    )
  }
}
