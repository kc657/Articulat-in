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
  }

  openModal = () => {
    this.setState({isModalOpen : !this.state.isModalOpen})
  }

  clickNewAttempt = () => {
    this.setState({newAttempt: !this.state.newAttempt})
  }

  onSubmitTranscript = (event) => {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/api/projects',
      data: {
        title: this.state.newProjectTitle,
        transcript: this.state.newProjectTranscript
      }
    }).then(res=>{
      this.setState({
        title: '',
        transcript: ''
      })
      this.openModal()
    })
  }

  render () {
    return (
      <div className='BodyContainer'>
        {!this.state.newAttempt ? <ProfilePage   clickNewAttempt={(event)=>this.clickNewAttempt(event)} openModal={(event)=>this.openModal(event)}/> : <SpeechAndGrade clickNewAttempt={(event)=>this.clickNewAttempt(event)}/>}

        <ProjectModal isModalOpen={this.state.isModalOpen} newProjectTitle={this.state.newProjectTitle} newProjectTranscript={this.state.newProjectTranscript} openModal={(event)=>this.openModal(event)} handleChange={(event)=>this.handleChange(event)} onSubmitTranscript={(event)=>this.onSubmitTranscript(event)}/>
      </div>
    )
  }
}

export default BodyContainer
