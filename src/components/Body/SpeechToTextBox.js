import React, {Component} from 'react'
import $ from 'jquery'

class SpeechToTextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      stream: {},
      userInput:'',
      confirmation: false
    }
  }

  startRecording = () => {
    this.setState({isRecording: true})
    let stream = null
    let recognizeMic = require('watson-speech/speech-to-text/recognize-microphone')
    $.when($.get('/api/watson/token')).done(
      (token) => {
        stream = recognizeMic({
          token: token,
          outputElement: '#speech',
          clear: true
        })
        this.setState({stream:stream})
        stream.on('error', function (err) {
          console.log(err)
        })
      }
    )
  }

  stopRecording = () => {
    this.setState({isRecording: false})
    $("#speech-only").append("Hello");
    this.state.stream.stop('error', function (err) {
      console.log(this.state.stream);
      console.log(err)
    })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      if (this.state.userInput === ''){
        this.setState({confirmation: true})
        console.log('If you are sure, press Enter again')
      } else if(this.state.userInput !== ''){
        console.log('saved!');
        console.log(this.state.userInput);
      }
    }
  }

  saveUserInput = (event) => {
    this.setState({userInput: event.target.value})
  }

  render () {
    return (
      <div className='container' id='top'>
        <div className='row'>
          <div className='col m12 center text-center'>
            <h1>Practice Room</h1>
          </div>
        </div>
        <div className='row col m6'>
          {!this.state.isRecording? <a className='waves-effect waves-light btn' onClick={this.startRecording}><i className='material-icons left'>record_voice_over</i>Record</a>: <a className='waves-effect waves-dark btn' onClick={this.stopRecording}><i className='material-icons left'>stop</i>Stop</a>}
        </div>
        <div className='row col m6'>
          <center>
            <form>
              <textarea className='materialize-textarea speech-only' id='speech' data-id-type='userInput' onChange={this.saveUserInput} placeholder='Spoken output goes here' onKeyPress={this.handleKeyPress}></textarea>
              {!this.state.confirmation? <p>Select text and press enter after completion to review scorecard...</p>:<p>Press Enter Again</p>}
            </form>
          </center>
        </div>
      </div>
    )
  }
}

export default SpeechToTextBox
