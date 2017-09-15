import React, { Component } from 'react'
import SpeechAndGrade from './Body/SpeechAndGrade'
import ProfilePage from './Body/ProfilePage'
import ProjectModal from './Body/ProjectModal'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class BodyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false,
      newAttempt: false,
      newProjectTitle: '',
      newProjectTranscript: ''
    }
  }

  openModal = () => {
    this.setState({isModalOpen : !this.state.isModalOpen})
    console.log(this.state.isModalOpen);
  }

  clickNewAttempt = () => {
    this.setState({newAttempt: !this.state.newAttempt})
  }

  render () {
    return (
      <div className='BodyContainer'>
        {!this.state.newAttempt ? <ProfilePage   clickNewAttempt={(event)=>this.clickNewAttempt(event)}/> : <SpeechAndGrade clickNewAttempt={(event)=>this.clickNewAttempt(event)}/>}
        <button onClick={this.openModal}>Hi</button>
        <ProjectModal isModalOpen={this.state.isModalOpen} openModal={(event)=>this.openModal(event)}/>
      </div>
    )
  }
}

export default BodyContainer
