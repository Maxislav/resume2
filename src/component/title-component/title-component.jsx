import React from 'react';
import createReactClass from 'create-react-class';
import titleStyl from './title-component.styl'

export default createReactClass({
    render: ()=>{
        return (
          <div className={titleStyl.title}>
              <h1>Title</h1>
          </div>

        )
    }
});
