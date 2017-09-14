import React, { Component } from 'react'
import './App.css'
import SpeechToTextBox from './components/SpeechToTextBox'
import NavBar from './components/NavBar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <NavBar />
        <SpeechToTextBox />
      </div>
    )
  }
}

export default App
