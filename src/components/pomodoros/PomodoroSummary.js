import React, { Component} from 'react';
import moment from 'moment'

const PomodoroSummary = ({pomodoro}) => {
    return(
        <div>
            <td>{pomodoro.session_type}</td>
            <td>{moment(pomodoro.createdAt.toDate()).calendar()}</td>
        </div>
    )
}

export default PomodoroSummary;