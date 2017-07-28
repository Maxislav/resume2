import React from 'react';
import createReactClass from 'create-react-class';


export default createReactClass({
    render: function(){
        return (
            <li>
                {this.props.name}
            </li>

        )
    }
});