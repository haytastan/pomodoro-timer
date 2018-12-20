import React, { Component} from 'react';
import PomodoroList from '../pomodoros/PomodoroList';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import Graph from '../pomodoros/Graph'
import getWeekNumber from '../pomodoros/StatisticInfo'

class Statistic extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOption: 48,
            weekPomodoros: []
        }
        this.options = []
    }

    componentDidMount(){
        for (var i = 1; i <= 52; i++) {
            this.options = [ ...this.options,
                { value:i, label: 'Week '+i }
            ]
        }
        var weekNo = getWeekNumber(new Date())
        this.setState({
            selectedOption: weekNo
        })
    }

    handleChange = (selectedOption) => {
        var optionWeek = String(selectedOption.value)
        this.setState({ selectedOption: optionWeek });
        console.log("option",this.state.selectedOption)
        let selectedWeek = this.state.selectedOption
         console.log("select week", selectedWeek)
         let weekPomodoros = this.props.pomodoros.filter(function(pomodoro) {
             // console.log(pomodoro.weekNumOfYear)
             return pomodoro.weekNumOfYear === selectedWeek
         })
         this.setState({ weekPomodoros: weekPomodoros })
    }

    handleWeekPomodoros = () =>{
        let selectedWeek = this.state.selectedOption['value']
        console.log("select week", selectedWeek)
        let weekPomodoros = this.props.pomodoros.filter(function(pomodoro) {
            // console.log(pomodoro.weekNumOfYear)
            return pomodoro.weekNumOfYear === selectedWeek
        })
        this.setState({ weekPomodoros: weekPomodoros })
    }

    render(){
        const { selectedOption } = this.state;
        const {pomodoros} = this.props;
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to= '/signin' />
        const weekPomodoros = this.state.weekPomodoros
        console.log("selected option", this.state.selectedOption)
        console.log("pomodoros", this.state.weekPomodoros)
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.options}
                        />
                    </div>
                    <div className="row">
                        <Graph pomodoros={weekPomodoros} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        pomodoros: state.firestore.ordered.pomodoros
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        if (!props.auth.uid) return []
        return [
            {collection: 'pomodoros',
            where: [
                ['userId', '==', props.auth.uid]
            ]
        }
        ]
    } )
)(Statistic);