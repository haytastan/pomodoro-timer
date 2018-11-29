import React, { Component} from 'react';
import PomodoroSummary from './PomodoroSummary'

const PomodoroList = ({pomodoros}) => {
    console.log("bu pomo canım", pomodoros)
    return(
        <div className="section">
            { pomodoros && pomodoros.map(pomodoro => {
                console.log("p", pomodoro)
                return (
                    <div key={pomodoro.id}>
                        <PomodoroSummary pomodoro={pomodoro} />
                    </div>
                )
            })}
        </div>
    )
}

export default PomodoroList;