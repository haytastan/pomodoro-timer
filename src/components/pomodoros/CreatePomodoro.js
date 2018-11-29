import React, { Component} from 'react';
import { createPomodoro } from '../../store/actions/pomodoroActions'
import { connect } from 'react-redux'

class CreatePomodoro extends Component {
    state = {
        session_type: 'short_break', date: '02/02/2018', start_time: '20:20', description: "aaaa"
    }

    handleSubmit = (e) => {
        this.props.createPomodoro(this.state)
    };
    render(){
        console.log(this.props)
        const {pomodoros} = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <button onClick={() => {this.handleSubmit()}}>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPomodoro: (pomodoro) => dispatch(createPomodoro(pomodoro))
    }
}

export default connect(null, mapDispatchToProps)(CreatePomodoro);