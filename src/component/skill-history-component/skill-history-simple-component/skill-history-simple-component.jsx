import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import styl from './skill-history-simple-component.styl'
import {NormalDate} from "../../../asset/normal-date";

@connect((store) => {
  return {
    history: store.skillReducer.history,
  }
})
export default class SkillHistorySimpleComponent extends React.Component{

  componentDidMount(e){
    this.props.dispatch({
      type:'FETCH_HISTORY',
      payload: axios.get('asset/skill-history.json')
    });
  }

  render ( ){
    return (
      <table className={styl['history-table']}>
        <tbody>
        {
          this.props.history.map((item, index) => {
            return <tr key={index}>
              <td>
                {item.name}
              </td>
              <td>
                {new Date(Math.min(...item.date.map(d=>new NormalDate(d[0]).getTime() ))).toLocaleDateString()}
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
    )
  }
}