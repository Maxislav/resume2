import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import styl from './skill-history-simple-component.styl'
import {NormalDate, toYearMonthDay} from "../../../asset/normal-date";
import dateFormat from 'dateformat'


const Period = ({ dateList }) => {
  let period = 0;
  for (let i = 0; i < dateList.length; i++) {
    const t2 = dateList[i][1] ? new NormalDate(dateList[i][1]) : new Date();
    const t1 = dateList[i][0] ? new NormalDate(dateList[i][0]) : new Date();
    const deltaT = t2.getTime() - t1.getTime();
    period += deltaT
  }
  return (
    <div className={styl.period}>
      {toYearMonthDay(period).YY ? <div> {toYearMonthDay(period).YY}years </div> : null }
      {toYearMonthDay(period).MM ? <div> {toYearMonthDay(period).MM}months </div> : null }
      {toYearMonthDay(period).DD ? <div> {toYearMonthDay(period).DD}days </div> : null }
    </div>
  )
};

const StarDate = ({dateList}) => {
  const d =  new Date(Math.min(...dateList.map(d=>new NormalDate(d[0]).getTime() )))
  return(
    <div>
      {dateFormat(d,'mmmm, yyyy' )}
    </div>
  )
}
//{new Date(Math.min(...item.date.map(d=>new NormalDate(d[0]).getTime() ))).toLocaleDateString()}

@connect((store) => {
  return {
    history: store.skillReducer.history,
  }
})
export default class SkillHistorySimpleComponent extends React.Component{

  constructor(...args){
    super(...args)
  }

  componentDidMount(e){
    if(!this.props.history.length)
      this.props.dispatch({
        type:'FETCH_HISTORY',
        payload: axios.get('./cv-json-data/skill-history.json')
      });
  }

  render ( ){
    return (
      <table className={styl['history-table']}>
        <thead>
          <tr>
            <td>
              Framework || Lib
            </td>
            <td>
              Start date
            </td>
            <td>
              Period
            </td>
          </tr>
        </thead>
        <tbody>
        {
          this.props.history.map((item, index) => {
            return (<tr key={index}>
              <td>
                {item.name}
              </td>
              <td>
                <StarDate dateList={item.date}/>
              </td>
              <td>
                <Period dateList={item.date} />
              </td>
            </tr>)
          })
        }
        </tbody>
      </table>
    )
  }
}