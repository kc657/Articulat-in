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
      newProjectTone: {},
      selectedProject: '',
      selectedProjectTitle: '',
      currentUserId: this.props.currentUserId
    }
  }

  handleChange = (e) => {
    let formId = $(e.target).closest('.modalState').data('id-type')
    this.setState({[formId]: e.target.value})
  }

  handleProjectSelect = (e) => {
    let projectId = $(e.target).closest('.click-for-project').data('project-id')
    let projectName = $(e.target).closest('.click-for-project').data('project-name')
    this.setState({
      selectedProject: projectId,
      selectedProjectTitle: projectName
    })
  }

  handleProjectDelete = () => {
    this.setState({
      selectedProject: '',
      selectedProjectTitle: ''
    })
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

  onProjectSubmit = (e) => {
    e.preventDefault()
    $.ajax({method:'GET',
      url: 'http://localhost:3001/api/watson/tone/',
      data:{'myText': this.state.newProjectTranscript}})
    .then((res) => {
        let projectTone = {
          emotionalTone_Anger: res.document_tone.tone_categories[0].tones[0].score*100,
          emotionalTone_Disgust: res.document_tone.tone_categories[0].tones[1].score*100,
          emotionalTone_Fear: res.document_tone.tone_categories[0].tones[2].score*100,
          emotionalTone_Joy: res.document_tone.tone_categories[0].tones[3].score*100,
          emotionalTone_Sadness: res.document_tone.tone_categories[0].tones[4].score*100,
          languageTone_Analytical: res.document_tone.tone_categories[1].tones[0].score*100,
          languageTone_Confident: res.document_tone.tone_categories[1].tones[1].score*100,
          languageTone_Tentative: res.document_tone.tone_categories[1].tones[2].score*100,
          socialTone_Openness: res.document_tone.tone_categories[2].tones[0].score*100,
          socialTone_Conscientiousness: res.document_tone.tone_categories[2].tones[1].score*100,
          socialTone_Etraversion: res.document_tone.tone_categories[2].tones[2].score*100,
          socialTone_Agreeableness: res.document_tone.tone_categories[2].tones[3].score*100,
          socialTone_EmotionalRange: res.document_tone.tone_categories[2].tones[4].score*100,
        }
        this.setState({newProjectTone: projectTone})
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
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3001/api/projects',
          data: {
            title: this.state.newProjectTitle,
            transcript: this.state.newProjectTranscript,
            tones: this.state.newProjectTone,
            transcriptSpilt: transcriptSpilt,
            _user: this.props.currentUserId,
          }
        }).then(res=>{
          this.setState({
            newProjectTitle: '',
            newProjectTranscript: ''
          })
          this.openModal()
        })
      }, (err) => {
        console.log('error: ', err)
    })
  }

  render () {
    return (
      <div className='BodyContainer'>
        {!this.state.newAttempt ? <ProfilePage clickNewAttempt={(e)=>this.clickNewAttempt(e)} openModal={(e)=>this.openModal(e)} handleProjectSelect={(e)=>this.handleProjectSelect(e)} handleProjectDelete={(e)=>this.handleProjectDelete(e)} selectedProject={this.state.selectedProject} selectedProjectTitle={this.state.selectedProjectTitle} currentUserId={this.props.currentUserId} /> : <SpeechAndGrade clickNewAttempt={(e)=>this.clickNewAttempt(e)} saveWatsonInput={(e)=>this.saveWatsonInput(e)} selectedProjectTitle={this.state.selectedProjectTitle} selectedProject={this.state.selectedProject}  currentUserId={this.props.currentUserId}/>}
        <ProjectModal isModalOpen={this.state.isModalOpen} newProjectTitle={this.state.newProjectTitle} newProjectTranscript={this.state.newProjectTranscript} openModal={(e)=>this.openModal(e)} handleChange={(e)=>this.handleChange(e)} onProjectSubmit={(e)=>this.onProjectSubmit(e)}/>
      </div>
    )
  }
}

export default BodyContainer
