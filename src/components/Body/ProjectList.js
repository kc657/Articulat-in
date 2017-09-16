import React, { Component } from 'react'

class ProjectList extends Component {
  render () {
    return(
      <div>
      <h1 className='center'> Projects   <a className='btn-floating btn-large waves-effect waves-light red' onClick={this.props.openModal}><i className='material-icons'>add</i></a></h1>
      </div>
    )
  }
}

export default ProjectList
