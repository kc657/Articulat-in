import React, { Component } from 'react'

class AttemptList extends Component {
  render () {
    return(
      <div>
      <h1 className='center'>Previous Attempts</h1>
      <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Switch</a>
      </div>
    )
  }
}

export default AttemptList
