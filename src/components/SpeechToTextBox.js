import React, {Component} from 'react'
import $ from 'jquery'

class SpeechToTextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false
    }
  }

  onRecordClick = () => {
    this.setState({isRecording: !this.state.isRecording})
    this.recording()
    console.log('No Longer Recording = ', this.state.isRecording)
  }

  recording = () => {
    let stream = null
    let isRecording = this.state.isRecording
    let recognizeMic = require('watson-speech/speech-to-text/recognize-microphone')
    if (!isRecording) {
      $.when($.get('http://localhost:3001/api/watson/token')).done(
        function (token) {
          stream = recognizeMic({
            token: token,
            outputElement: '#speech' // CSS selector or DOM Element
          })
          stream.on('error', function (err) {
            console.log(err)
          })
        }
      )
    }
  }

  // onUserRecord = () => {
  //   this.setState({userInput: this.text})
  //   console.log(this.state.userInput);
  // }

  render () {
    return (
      <div className='cover'>
        <div className='container' id='top'>
          <div className='app_container' id='body'>
            <div className='row'>
              <div className='col-md-6 text-center'>
                <h1>Voice Input</h1>
              </div>
            </div>
            <div className='row'>
              <a className='waves-effect waves-light btn' onClick={this.onRecordClick}><i className='material-icons left'>record_voice_over</i>Record</a>
              <br />
              <div className='col-md-6'>
                <center><img id='microphone' src='images/microphone.png' alt='#' /><img id='stop' src='images/stop.png' alt='#' /></center>
              </div>
              <br />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <center>
                  <p className='speech-only' id='speech'>Spoken output goes here</p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SpeechToTextBox
