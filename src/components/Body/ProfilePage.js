import React, { Component } from 'react'
import ProjectList from './ProjectList'
import AttemptList from './AttemptList'

class ProfilePage extends Component {
  render () {
    return (
      <div className='ProfilePage row m'>
        <div className='col s12 m4'>
          <ProjectList openModal={this.props.openModal}/>
        </div>
        <div className='col s12 m8'>
          <AttemptList clickNewAttempt={this.props.clickNewAttempt}/>
        </div>
      </div>
    )
  }
}

export default ProfilePage
