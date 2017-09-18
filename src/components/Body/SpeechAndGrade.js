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
    }
  }

  componentDidMount(){
    $.ajax({method:'GET',url: 'http://localhost:3001/api/projects/showOne/' + this.props.selectedProject})
    .then((res) => {
      this.setState({userTranscript: res[0].transcript})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  showGrade = () => {
    this.setState({isGrading: !this.state.isGrading})
    console.log('State of grade is ', this.state.isGrading);
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

        function lcs(x,y){
        	var s,i,j,m,n,
        		lcs=[],row=[],c=[],
        		left,diag,latch;
        	//make sure shorter string is the column string
        	if(m<n){s=x;x=y;y=s;}
        	m = x.length;
        	n = y.length;
        	for(j=0;j<n;row[j++]=0);
        	for(i=0;i<m;i++){
        		c[i] = row = row.slice();
        		for(diag=0,j=0;j<n;j++,diag=latch){
        			latch=row[j];
        			if(x[i] === y[j]){row[j] = diag+1;}
        			else{
        				left = row[j-1]||0;
        				if(left>row[j]){row[j] = left;}
        			}
        		}
        	}
        	(i--,j--);
        	while(i>-1&&j>-1){
        		switch(c[i][j]){
        			default: j--;
        				lcs.unshift(x[i]);
                break;
        			case (i&&c[i-1][j]): i--;
        				continue;
        			case (j&&c[i][j-1]): j--;
        		}
        	}
        	return lcs.join('');
        }

        let lcsSave = lcs(this.state.userTranscript,lcsWatsonInput)
        console.log(this.state.userTranscript);
        let lcsScoreSave = (lcsSave).length

        console.log('The LCS string is ', lcsSave,' and the length is ', lcsScoreSave)

        $.ajax({
          method: 'POST',
          url: 'http://localhost:3001/api/attempts',
          data: {
            attemptTranscriptSpilt: resultSplit,
            attemptTranscript: this.state.watsonInput,
            lcs: lcsSave,
            lcsScore: lcsScoreSave,
            _project: this.props.selectedProject,
            _user:this.props.currentUserId
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
