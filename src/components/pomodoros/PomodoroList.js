import React, { Component} from 'react';
import PomodoroSummary from './PomodoroSummary'
import moment from 'moment'

const PomodoroList = ({pomodoros}) => {
    return(
        <table>
        <thead>
          <tr>
              <th>Session Type</th>
              <th>Date</th>
          </tr>
        </thead>
        <tbody>
            { pomodoros && pomodoros.map(pomodoro => {
                return (
                    <tr key={pomodoro.id}>
                        <td>{pomodoro.session_type}</td>
                        <td>{moment(pomodoro.createdAt.toDate()).calendar()}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PomodoroList;