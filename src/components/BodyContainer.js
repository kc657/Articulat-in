import React, { Component } from 'react'
import SpeechAndGrade from './Body/SpeechAndGrade'
import ProfilePage from './Body/ProfilePage'

// import { BrowserRouter, Route, Link } from 'react-router-dom'

class BodyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newAttempt: false
    }
  }

  clickNewAttempt = () => {
    this.setState({newAttempt: !this.state.newAttempt})
  }

  render () {
    return (
      <div className='BodyContainer'>
        {!this.state.newAttempt ? <ProfilePage   clickNewAttempt={(event)=>this.clickNewAttempt(event)}/> : <SpeechAndGrade clickNewAttempt={(event)=>this.clickNewAttempt(event)}/>}
      </div>
    )
  }
}

export default BodyContainer
