

import React from 'react';
import createReactClass from 'create-react-class';

import SkillHistoryItemComponent from './skill-history-item-component/skill-history-item-component';

import history from '../../asset/skill-history';

import skillHistoryStyl from './skill-history-component.styl';



export default createReactClass({
    getInitialState: function () {
        return {
            displayList: history
        }
    },
    handleSearch: function (e) {
        const  displayList = history.filter(it=>{
            return it.name.toLowerCase().indexOf(e.target.value.toLowerCase())!=-1
        });
        this.setState({
            displayList
        })
    },
    render: function () {
        return (
            <div className={skillHistoryStyl.content}>
                <input type="text" onChange={this.handleSearch} className={skillHistoryStyl.input}/>
                <div>
                    <ul>
			                {
				                this.state.displayList.map((item, index)=>{
					                return <SkillHistoryItemComponent name={item.name} key={index} date={item.date}/>
				                })
			                }
                    </ul>
                </div>
            </div>
        )
    }
});