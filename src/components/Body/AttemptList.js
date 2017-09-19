import React, { Component } from 'react'
import DeleteModal from './DeleteModal'
import $ from 'jquery'

class AttemptList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allAttempts: [],
      isDeleteModalOpen: false
    }
  }

  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/attempts/' + this.props.currentUserId
    })
    .then((res) => {
      this.setState({allAttempts: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  toggleDeleteModal = () => {
    this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen})
  }

  deletingProject = () => {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:3001/api/projects/deleteOne/' + this.props.selectedProject
    })
    .then((res)=>{
      this.toggleDeleteModal()
      this.props.handleProjectDelete()
    })
  }

  render () {
    let attemptCards = this.state.allAttempts.map(attempts => {
      if (attempts._project === this.props.selectedProject) {
        return (
          <li className='collection-item avatar hoverable' key={attempts._id}>The LCS is: {attempts.lcs} and the score is {attempts.lcsScore}</li>
        )
      }
      return null
    })
    return (
      <div>
        <h1 className='center'>Project: {this.props.selectedProjectTitle}</h1>
        <div className='row center'>
          <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Add New Recording</a> &emsp;
          <a className='waves-effect waves-dark btn' onClick={this.toggleDeleteModal}>Delete Project</a>
        </div>
        <ul className="collection">
          {attemptCards}
        </ul>
        <DeleteModal toggleDeleteModal={(e)=>this.toggleDeleteModal(e)} isDeleteModalOpen={this.state.isDeleteModalOpen} deletingProject={(e)=>this.deletingProject(e)}/>
      </div>
    )
  }
}

export default AttemptList
