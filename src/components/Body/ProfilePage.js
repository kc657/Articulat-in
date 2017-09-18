import React, { Component } from 'react'
import ProjectList from './ProjectList'
import AttemptList from './AttemptList'

class ProfilePage extends Component {
  render () {
    return (
      <div className='ProfilePage row'>
        <div className='col s12 m4'>
          <ProjectList openModal={this.props.openModal} handleProjectSelect={this.props.handleProjectSelect} currentUserId={this.props.currentUserId}/>
        </div>
        <div className='col s12 m8'>
          <AttemptList clickNewAttempt={this.props.clickNewAttempt} selectedProject={this.props.selectedProject} currentUserId={this.props.currentUserId}/>
        </div>
      </div>
    )
  }
}

export default ProfilePage
