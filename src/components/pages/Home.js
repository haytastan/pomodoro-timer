import React, { Component } from 'react';

import withAuthorization from '../withAuthorization';
import { db } from '../../firebase';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fireStoreConnect } from 'react-redux-firebase'
import { createPomodoro } from '../../store/actions/pomodoroActions'

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      minutes: '01',
      seconds: '00',
      isPlay: false,
      isPause: false,
      pauseMinutes: '00',
      pauseSeconds: '00',
      shortBreakMinutes: '01',
      shortBreakSeconds: '00',
      longBreakMinutes: '01',
      longBreakSeconds: '00',
      pomodoroCounter: 0,
      session: 'pomodoro',
      shortBreak: false,
      isPomodoroTime: false,
      breakButtons: false,
      logged: true
    }
      this.secondsRemaining = '';
      this.intervalHandle = '';
      this.startMinuteValue = '';
      this.startSecondValue = '';
  };
  componentDidMount() {
    
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  componentWillMount() {
    this.startMinuteValue = this.state.minutes
    this.startSecondValue = this.state.seconds
  }

  tick = () => {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })
    }
    if (min < 10) {
      this.setState({
        value: "0" + min,
      })
    }
    if (min === 0 & sec === 0) {
        clearInterval(this.intervalHandle);
        this.setState({
            breakButtons: true
        })
        this.props.createPomodoro(this.state)
    }
    this.secondsRemaining--
  }

  _getPause = () => {
    clearInterval(this.intervalHandle);
    this.setState({
      isPause: true,
      pauseMinutes: this.state.minutes,
      pauseSeconds: this.state.seconds,
    })
    console.log("minutes", this.state.minutes, this.state.seconds)
    console.log("pause: ",this.state.isPause, this.state.pauseMinutes, this.state.pauseSeconds )
  }

_getStop = () => {
    clearInterval(this.intervalHandle);
    this.setState({
        isPlay: false,
        minutes: this.startMinuteValue,
        seconds: this.startSecondValue,
    })
}

_getContinue = () => {
    this.setState({
        minutes: this.state.pauseMinutes,
        seconds: this.state.pauseSeconds,
        isPause: false,
    })
    console.log("continue: ", this.state.minutes, this.state.minutes)

    this.intervalHandle = setInterval(this.tick, 1000);
}

startCountDown = () => {
  this.setState({
      isPlay: true,
      isPause: false,
      pomodoroCounter: this.state.pomodoroCounter + 1,
      isPomodoroTime: true,
      breakButtons: false,
      session: 'pomodoro'
  })
  this.intervalHandle = setInterval(this.tick, 1000);
  let time = this.startMinuteValue;
  this.secondsRemaining = time * 60;
}

_getTakeABreak = () => {
  this.setState({
      breakButtons: false
  })
  if(this.state.pomodoroCounter % 4 === 0){
      this.setState({
          session: 'long_break'
      })
      var time = this.state.longBreakMinutes;
  }else{
      this.setState({
        session: 'short_break',
        shortBreak: true
      })
      var time = this.state.shortBreakMinutes;
  }

  this.intervalHandle = setInterval(this.tick, 1000);
  this.secondsRemaining = time * 60;
}

renderPomodoroButtons = () => {
  return(
      <div>
          {
              this.state.isPlay ?
              <div>
                  {
                      this.state.isPause ?
                      <FontAwesomeIcon icon={faPlayCircle} onClick={this._getContinue}/>
                      :
                      <FontAwesomeIcon icon={faPauseCircle} onClick={this._getPause} />
                  }
                  <FontAwesomeIcon icon={faStopCircle}  onClick={this._getStop} />
              </div>
              :
              <div>
                  <FontAwesomeIcon icon={faPlayCircle} onClick={this.startCountDown} />
              </div>
          }
      </div>
  )
}

  render() {
    const { users } = this.state;
    var minutes = this.state.minutes
    var seconds = this.state.seconds
    var percent = (this.state.minutes * this.startMinuteValue / 100)
    const { auth } = this.props
    console.log("home", this.props)
    console.log("state", this.state)

    if(!auth.uid) return <Redirect to= '/signin' />
    return (
      <div id="pomodoro-app">
                <div style={{width:300, height:300, margin: 'auto', textAlign: 'center'}}>
                    <div id="timer">
                    <div id="time">
                <CircularProgressbar
                    percentage={percent}
                    text={`${minutes}:${seconds}`}
                    />
                        <span id="minutes">{minutes}</span>
                        <span id="colon">:</span>
                        <span id="seconds">{seconds}</span>
                    </div>
                    <div id="filler"></div>
                    </div>

                    <div id="buttons">
                    {
                        this.state.breakButtons ?
                        <div>
                            <button onClick={this._getTakeABreak}>Take a Break</button>
                            <button onClick={this.startCountDown}>Continue</button>
                        </div>
                        :
                        <div>
                            {this.renderPomodoroButtons()}
                            </div>
                    }
                    </div>
                </div>
            </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPomodoro: (pomodoro) => dispatch(createPomodoro(pomodoro))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);