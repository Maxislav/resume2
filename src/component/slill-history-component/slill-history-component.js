

import React from 'react';
import createReactClass from 'create-react-class';

import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';

import history from '../../asset/skill-history';

export default createReactClass({
    getInitialState: function () {
        return {
            displayList: history
        }
    },
    handleSearch: function (e) {
        const  displayList = history.filter(it=>{
            return it.name.indexOf(e.target.value)!=-1
        });
        this.setState({
            displayList
        })
    },
    render: function () {
        return (
            <div>
                <input type="text" onChange={this.handleSearch}/>
                <ul>
                    {
                        this.state.displayList.map((item, index)=>{
                            return <SkillHistoryItemComponent name={item.name} key={index}/>
                        })
                    }
                </ul>

            </div>

        )
    }
});