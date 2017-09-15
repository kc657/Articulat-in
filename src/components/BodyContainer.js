import React, { Component } from 'react'
import $ from 'jquery'
import SpeechAndGrade from './Body/SpeechAndGrade'
import ProfilePage from './Body/ProfilePage'
import ProjectModal from './Body/ProjectModal'

class BodyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false,
      newAttempt: false,
      newProjectTitle: '',
      newProjectTranscript: '',
    }
  }

  handleChange = (event) => {
    let formId = $(event.target).closest('.modalState').data('id-type')
    this.setState({[formId]: event.target.value})
    console.log(this.state.newProjectTitle)
    console.log(this.state.newProjectTranscript);
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
        {!this.state.newAttempt ? <ProfilePage   clickNewAttempt={(event)=>this.clickNewAttempt(event)} openModal={(event)=>this.openModal(event)}/> : <SpeechAndGrade clickNewAttempt={(event)=>this.clickNewAttempt(event)}/>}

        <ProjectModal isModalOpen={this.state.isModalOpen} newProjectTitle={this.state.newProjectTitle} newProjectTranscript={this.state.newProjectTranscript} openModal={(event)=>this.openModal(event)} handleChange={(event)=>this.handleChange(event)}/>
      </div>
    )
  }
}

export default BodyContainer
