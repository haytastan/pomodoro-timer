import React, { Component } from 'react';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Setting extends Component {
  constructor(props){
    super(props)
    this.sessionRef = React.createRef();
    this.shortRef = React.createRef();
    this.longRef = React.createRef();
  }

  handleChange = (props) => {
    const { value, dragging, index, ...restProps } = props;
    if(localStorage.getItem('session_time')){
      localStorage.setItem('session_time', value)
      console.log(localStorage.getItem('session_time'))

    }else{
      localStorage.setItem('session_time', value)

    }
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  }
  render(){
    const {auth} = this.props;
    const users = this.props.users
    const wrapperStyle = { width: 400, margin: 50 };
    if(!auth.uid) return <Redirect to= '/signin' />
    return (
      <div className="container">
          <h5 className="grey-text text-darken-3">{auth.email}</h5>
          {/* <div style={wrapperStyle}>
            Session Time: <Slider min={1} max={100} defaultValue={25} handle={this.handleChange}/>
            Short Break: <Slider min={1} max={100} defaultValue={5} handle={this.handle}/>
            Long Break: <Slider min={1} max={100} defaultValue={60} handle={this.handle}/>
          </div> */}
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
      if (!props.auth.uid) return []
      return [
          {collection: 'users',
          where: [
              ['email', '==', props.auth.email]
          ]
      }
      ]
  } )
)(Setting);