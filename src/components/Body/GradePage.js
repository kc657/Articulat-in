import React, { Component } from 'react'

class GradePage extends Component {
  render () {
    return (
      <div className='GradePage'>
        <h1> Grade Page </h1>
        <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Save and Go Home</a>
      </div>
    )
  }
}

export default GradePage
