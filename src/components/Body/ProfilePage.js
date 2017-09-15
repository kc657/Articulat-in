import React, { Component } from 'react'

class ProfilePage extends Component {
  render () {

    const backdropStyle = {
      overlay: {zIndex: -1}
    }

    return (
      <div className='ProfilePage'>
        <h1> Hello World </h1>
        <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt} style={backdropStyle}>Switch</a>
      </div>
    )
  }
}

export default ProfilePage
