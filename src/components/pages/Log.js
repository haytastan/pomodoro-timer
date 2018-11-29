import React, { Component } from 'react';

import PomodoroList from '../PomodoroList';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Log extends Component {
    render(){
        console.log("Logs")
        const {pomodoros} = this.props;
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to= '/signin' />
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <PomodoroList pomodoros = {pomodoros}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        pomodoros: state.firestore.ordered.pomodoros
    }
}

export default connect(mapStateToProps)(Log);