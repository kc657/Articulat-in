import React, { Component } from 'react'
import SpeechToTextBox from './SpeechToTextBox'
import GradePage from './GradePage'

class SpeechAndGrade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGrading: false
    }
  }

  showGrade = () => {
    this.setState({isGrading: !this.state.isGrading})
  }

  render () {
    return (
      <div className='SpeechAndGrade'>
        {this.state.isGrading ? <GradePage   showGrade={(event)=>this.showGrade(event)}clickNewAttempt={this.props.clickNewAttempt} /> : <SpeechToTextBox showGrade={(event)=>this.showGrade(event)}/>}
      </div>
    )
  }
}

export default SpeechAndGrade
