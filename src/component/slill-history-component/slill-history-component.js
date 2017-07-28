

import React from 'react';
import createReactClass from 'create-react-class';

import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';

import history from '../../asset/skill-history';

export default createReactClass({
    render: ()=>{
        return (
            <ul>
                {
                    history.map((item, index)=>{
                        return <SkillHistoryItemComponent name={item.name} key={index}/>
                    })
                }
            </ul>

        )
    }
});