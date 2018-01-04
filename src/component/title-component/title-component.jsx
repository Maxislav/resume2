import React from 'react';
import createReactClass from 'create-react-class';
import titleStyl from './title-component.styl'

export default createReactClass({
    render: ()=>{
        return (
          <div className={titleStyl.title + " flex"}>
             <img src="./img/favicon.ico"/> <h2>Maxim Lipatov</h2>
          </div>

        )
    }
});
