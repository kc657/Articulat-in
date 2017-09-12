import React, { Component } from 'react'
import './App.css'
import SpeechToTextBox from './components/SpeechToTextBox'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SpeechToTextBox />
      </div>
    )
  }
}

export default App
