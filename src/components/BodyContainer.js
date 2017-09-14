import React, { Component } from 'react'
import SpeechToTextBox from './Body/SpeechToTextBox'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class BodyContainer extends Component {
  render () {
    return (
      <div className='BodyContainer'>
        <SpeechToTextBox />
      </div>
    )
  }
}

export default BodyContainer
