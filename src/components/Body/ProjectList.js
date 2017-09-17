import React, { Component } from 'react'
import $ from 'jquery'

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProjects: []
    }
  }

  componentWillMount() {
    $.ajax({
    method: 'GET',
    url: 'http://localhost:3001/api/projects'
  })
    .then((res) => {
      this.setState({allProjects: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  render() {
    let projectCards = this.state.allProjects.map(project => {
      return (
        <div key={project._id} id='citiesCard' className='container click-for-project' data-project-name={project.title} data-project-id={project._id} onClick={this.props.handleProjectSelect}>
          <h4>{ project.title }</h4>
        </div>
      )
    })

    return (
      <div id='projectList' className='col m12 center-align container'>
        <h1 className='center'> Projects   <a className='btn-floating btn-large waves-effect waves-light red' onClick={this.props.openModal}><i className='material-icons'>add</i></a></h1>
        { projectCards }
      </div>
    )
  }
}

export default ProjectList
