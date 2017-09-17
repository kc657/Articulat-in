import React, { Component } from 'react'
import $ from 'jquery'

class AttemptList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allAttempts: [],
      selectedProject: this.props.selectedProject,
    }
  }
  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/attempts/' + this.props.currentUserId
    })
    .then((res) => {
      console.log(res);
      this.setState({allAttempts: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  render () {
    return (
      <div>
        <h1 className='center'>Previous Attempts</h1>
        <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Switch</a>
      </div>
    )
  }
}

export default AttemptList

// render () {
//   let projectCards = this.state.allAttempts.map(project => {
//     return (
//       <a key={project._id} id='projectCard' className='collection-item click-for-project' data-project-name={project.title} data-project-id={project._id} onClick={this.props.handleProjectSelect}>
//         { project.title }
//       </a>
//     )
//   })
//
//   return (
//     <div id='projectList' className='col m12 center-align container collection'>
//       <h2 className='center'> Your Projects                                 <a className='btn-floating btn-large waves-effect waves-light red' onClick={this.props.openModal}><i className='material-icons'>add</i></a></h2>
//       { projectCards }
//     </div>
//   )
// }
