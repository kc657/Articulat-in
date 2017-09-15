import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import BodyContainer from './components/BodyContainer'

class App extends Component {

  render () {
    return (
      <div className='App'>
        <NavBar />
        <BodyContainer />
      </div>
    )
  }
}

export default App
