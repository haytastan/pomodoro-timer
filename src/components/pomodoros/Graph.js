
import React, {Component} from 'react';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import {HorizontalBar} from 'react-chartjs-2';
import update from 'react-addons-update';

var graph_data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Pomodoro',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0,0,0,0,0,0,0]
      }
    ]
  };

class WeekChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
     
                    data: [0, 0, 0, 0, 0, 0, 0]

        }
        this.weekOfDayCount=0;
    }

    componentDidUpdate(){
        let weekOfDayCount = [0,0,0,0,0,0,0]
        let pomodoroCount = this.props.pomodoros.length
        let pomodoros=this.props.pomodoros
        let day
        for(var i=0; i<pomodoroCount; i++){
            console.log("fo3333r")
            if(pomodoros[i].session_type == 'pomodoro'){
                day = pomodoros[i].dayNumOfWeek
                weekOfDayCount[day]=weekOfDayCount[day]+1;
                console.log("for", weekOfDayCount[day])
            }
        }

        graph_data.datasets.data = weekOfDayCount
        // this.setState(
        //     {
        //       data: update(this.state.data.datasets.data, {
        //         : {$set: weekOfDayCount},
        //       }),
        //     }
        //   )
    }
    render() {
        console.log("hh",graph_data)
        return(
            <div>
            <HorizontalBar data={graph_data} />
            </div>
        )
        }
    }

export default WeekChart;
