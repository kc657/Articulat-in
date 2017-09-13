import React, {Component} from 'react'

class SpeechToTextBox extends Component {
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
              <br />
              <div className='col-md-6'>
                <center><img id='microphone' src='images/microphone.png' /><img id='stop' src='images/stop.png' /></center>
              </div>
              <br />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <center>
                  <div cols='50' className='speech-only' id='speech'>S  poken output goes here</div>
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
