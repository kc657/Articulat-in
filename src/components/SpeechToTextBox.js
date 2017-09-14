import React, {Component} from 'react'
import $ from 'jquery'

class SpeechToTextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      stream: {}
    }
  }

  stopRecordClick = () => {
      this.setState({isRecording: false})
      this.stopRecording()
  }

  startRecording = () => {
    this.setState({isRecording: true})
    let stream = null
    let recognizeMic = require('watson-speech/speech-to-text/recognize-microphone')
    $.when($.get('http://localhost:3001/api/watson/token')).done(
      (token) => {
        stream = recognizeMic({
          token: token,
          outputElement: '#speech', // CSS selector or DOM Element
          clear: true
        })
        this.setState({stream:stream})
        console.log(this.state.stream);
        stream.on('error', function (err) {
          console.log(err)
        })
      }
    )
  }

  stopRecording = () => {
    this.setState({isRecording: false})
    this.state.stream.stop('error', function (err) {
      console.log(err)
    })
  }

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
              {!this.state.isRecording? <a className='waves-effect waves-light btn' onClick={this.startRecording}><i className='material-icons left'>record_voice_over</i>Record</a>: <a className='waves-effect waves-dark btn' onClick={this.stopRecording}><i className='material-icons left'>stop</i>Stop</a>}
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
