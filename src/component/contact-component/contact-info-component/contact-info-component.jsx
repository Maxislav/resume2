import React, {Component} from "react";
import styl from  './contact-info-component.styl'
import {xhrGet} from "../../../asset/xhr-get";

const $contact = []

export class ContactInfoComponent extends React.Component{

  constructor(...args){
    super(...args)
    this.state = {contact: $contact};

    if(!$contact.length){
      xhrGet('./cv-json-data/contact.json', 'json')
        .then(contact => {
          contact.map(item=>$contact.push(item))
          this.setState({
            contact
          })
        })
    }

  }

  render(){
    return (
      <table className={styl['contact-table']}>
        <tbody>
        {
          this.state.contact.map((contact, index) => {
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
    )
  }
}
