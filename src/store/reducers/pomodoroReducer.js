const initState = {
    pomodoros: [
        { id: 1, session_type: 'pomodoro', start_time: "12:38", date: "12/12/2018", description: "redux" },
        { id: 2, session_type: 'short_break', start_time: "14:38", date: "12/12/2018", description: "redux ara" },
        { id: 3, session_type: 'long_break', start_time: "18:38", date: "12/12/2018", description: "redux" },
        { id: 4, session_type: 'pomodoro', start_time: "17:38", date: "12/12/2018", description: "redux" },
        { id: 5, session_type: 'pomodoro', start_time: "19:38", date: "12/12/2018", description: "redux" }
    ]
}

const pomodoroReducer = (state = initState, action) => {
    switch (action.type){
        case 'CREATE_POMODORO':
            console.log("created pomodoro", action.pomodoro)
            return state;
        case 'CREATE_POMODORO_ERROR':
            console.log("created pomodoro error", action.err)
            return state;
        default:
            return state;
    }
    return state;
}

export default pomodoroReducer