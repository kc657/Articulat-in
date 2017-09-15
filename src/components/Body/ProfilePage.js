import React, { Component } from 'react'
import ProjectList from './ProjectList'

class ProfilePage extends Component {
  render () {
    return (
      <div className='ProfilePage row'>
        <div className='col s3'>
          <ProjectList />
        </div>
        <div className='col s9'>
          <h1 className='center'>Show Attempts Here</h1>
          <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Switch</a>
          <a className='btn-floating btn-large waves-effect waves-light red' onClick={this.props.openModal}><i className='material-icons'>add</i></a>
        </div>
      </div>
    )
  }
}

export default ProfilePage
