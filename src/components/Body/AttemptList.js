import React, { Component } from 'react'
import $ from 'jquery'

class AttemptList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allAttempts: []
    }
  }
  componentWillMount () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/attempts/' + this.props.currentUserId
    })
    .then((res) => {
      this.setState({allAttempts: res})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  render () {
    let attemptCards = this.state.allAttempts.map(attempts => {
      if(attempts._project === this.props.selectedProject){
        return(
          <h1 key={attempts._id}>The LCS is: {attempts.lcs} and the score is {attempts.lcsScore}</h1>
        )
      }
      return null
    })
    return (
      <div>
        <h1 className='center'>Project: {this.props.selectedProjectTitle}</h1>
        <a className='waves-effect waves-dark btn' onClick={this.props.clickNewAttempt}>Add New Recording</a>
        {attemptCards}
      </div>}
    )
  }
}

export default AttemptList
