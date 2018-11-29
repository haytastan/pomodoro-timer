import React, { Component} from 'react';
import moment from 'moment'

const PomodoroSummary = ({pomodoro}) => {
    return(
        <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
                <div className="card-title">{pomodoro.session_type} - {moment(pomodoro.createdAt.toDate()).calendar()}</div>
            </div>
        </div>
    )
}

export default PomodoroSummary;