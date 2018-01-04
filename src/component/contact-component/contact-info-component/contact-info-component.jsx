import React from "react";
import styl from  './contact-info-component.styl'

const contactData = [
  ['Maxim Lipatov'],
  ['Address', 'Kyiv, Ukraine'],
  ['Phone number', '+38066-593-0939'],
  ['E-mail', 'maximmalyshyn@gmail.com']
];

export default class ContactInfoComponent extends React.Component{
  render(){
    return (
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
    )
  }
}
