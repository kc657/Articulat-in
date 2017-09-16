import React, { Component } from 'react'
import SpeechToTextBox from './SpeechToTextBox'
import GradePage from './GradePage'
import $ from 'jquery'

class SpeechAndGrade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGrading: false,
      watsonInput: '',
      userTranscript: '',
      userTranscriptSpilt: null,
      currentProject: 1,
      currentUser: 1
    }
  }

  showGrade = () => {
    this.setState({isGrading: !this.state.isGrading})
  }

  triggerWatsonSave = (e) => {
    if(e.key === 'Enter'){
      if (this.state.watsonInput === ''){
        this.setState({confirmation: true})
        console.log('If you are sure, press Enter again')
      } else if(this.state.watsonInput !== ''){
        console.log('saved!');
        console.log(this.state.watsonInput);
        let result = []
        let hash = {}
        let words = this.state.watsonInput.replace(/[^A-Z0-9]/ig, " ").split(" ")
        words.forEach((word) => {
          word = word.toLowerCase()
          if (word !== "") {
            if (!hash[word]) {
              hash[word] = { name: word, count: 0 };
              result.push(hash[word])
            }
            hash[word].count++
          }
        })
        let resultSplit = result.sort((a, b) => { return b.count - a.count;})
        console.log(resultSplit);

        let lcsWatsonInput = this.state.watsonInput.replace(/[^A-Z0-9]/ig, "")
        let lcs = (a, b) => {
          let aSub = a.substr(0, a.length - 1);
          let bSub = b.substr(0, b.length - 1);

          if (a.length === 0 || b.length === 0) {
            return '';
          } else if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
            return lcs(aSub, bSub) + a.charAt(a.length - 1);
          } else {
            let x = lcs(a, bSub);
            let y = lcs(aSub, b);
            return (x.length > y.length) ? x : y;
          }
        }

        console.log(lcs('hello',lcsWatsonInput),lcs('hello',lcsWatsonInput).length);

        $.ajax({
          method: 'POST',
          url: 'http://localhost:3001/api/attempts',
          data: {
            attemptTranscriptSpilt: resultSplit,
            attemptTranscript: this.state.watsonInput
          }
        })
        this.setState({userTranscriptSpilt:1})
        console.log(this.state.userTranscriptSpilt);
        this.showGrade()
      }
    }
  }

  saveWatsonInput = (e) => {
    this.setState({watsonInput: e.target.value})
    console.log(this.state.watsonInput);
  }

  render () {
    return (
      <div className='SpeechAndGrade'>
        {this.state.isGrading ? <GradePage clickNewAttempt={this.props.clickNewAttempt} watsonInput={this.state.watsonInput} userTranscript={this.state.userTranscript}/> : <SpeechToTextBox saveWatsonInput={(e)=>this.saveWatsonInput(e)} showGrade={(e)=>this.showGrade(e)} triggerWatsonSave={(e)=>this.triggerWatsonSave(e)}/>}
      </div>
    )
  }
}

export default SpeechAndGrade
