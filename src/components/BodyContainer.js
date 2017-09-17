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
      selectedProject: '',
      selectedProjectTitle: '',
      selectedProjectTranscript: ''
    }
  }

  handleChange = (e) => {
    let formId = $(e.target).closest('.modalState').data('id-type')
    this.setState({[formId]: e.target.value})
  }

  handleProjectSelect = (e) => {
    let projectId = $(e.target).closest('.click-for-project').data('project-id')
    this.setState({selectedProject: projectId})
    console.log('Hello');
    console.log(projectId);
    console.log(this.state.selectedProject);
  }

  openModal = () => {
    this.setState({
      isModalOpen : !this.state.isModalOpen,
      newProjectTitle: '',
      newProjectTranscript: ''
    })
  }

  clickNewAttempt = () => {
    this.setState({newAttempt: !this.state.newAttempt})
  }

  onSubmitTranscript = (e) => {
    e.preventDefault()
    let result = []
    let hash = {}
    let words = this.state.newProjectTranscript.replace(/[^A-Z0-9]/ig, " ").split(" ")
    words.forEach((word) => {
      word = word.toLowerCase()
      if (word !== "") {
        if (!hash[word]) {
          hash[word] = { name: word, count: 0 };
          result.push(hash[word])
        }
        hash[word].count++
      }
    })
    let transcriptSpilt = result.sort((a, b) => { return b.count - a.count;})
    console.log(transcriptSpilt)
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/api/projects',
      data: {
        title: this.state.newProjectTitle,
        transcript: this.state.newProjectTranscript,
        transcriptSpilt: transcriptSpilt
      }
    }).then(res=>{
      this.setState({
        newProjectTitle: '',
        newProjectTranscript: ''
      })
      this.openModal()
    })
  }

  render () {
    return (
      <div className='BodyContainer'>
        {!this.state.newAttempt ? <ProfilePage   clickNewAttempt={(e)=>this.clickNewAttempt(e)} openModal={(e)=>this.openModal(e)} handleProjectSelect={(e)=>this.handleProjectSelect(e)}/> : <SpeechAndGrade clickNewAttempt={(e)=>this.clickNewAttempt(e)} saveWatsonInput={(e)=>this.saveWatsonInput(e)} selectedProject={this.state.selectedProject} selectedProjectTranscript={this.state.selectedProjectTranscript}/>}

        <ProjectModal isModalOpen={this.state.isModalOpen} newProjectTitle={this.state.newProjectTitle} newProjectTranscript={this.state.newProjectTranscript} openModal={(e)=>this.openModal(e)} handleChange={(e)=>this.handleChange(e)} onSubmitTranscript={(e)=>this.onSubmitTranscript(e)}/>
      </div>
    )
  }
}

export default BodyContainer
