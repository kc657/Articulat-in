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
          {(this.props.selectedProject)?<AttemptList clickNewAttempt={this.props.clickNewAttempt} selectedProject={this.props.selectedProject} selectedProjectTitle={this.props.selectedProjectTitle} currentUserId={this.props.currentUserId}/>:<div className='instructions center'><h1>Instructions</h1></div>}
        </div>
      </div>
    )
  }
}

export default ProfilePage
