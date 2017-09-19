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
      attemptTone: {}
    }
  }

  componentDidMount(){
    $.ajax({method:'GET',url: 'http://localhost:3001/api/projects/showOne/' + this.props.selectedProject})
    .then((res) => {
      this.setState({
        userTranscript: res[0].transcript,
        userTranscriptSpilt: res[0].transcriptSpilt})
    }, (err) => {
      console.log('error: ', err)
    })
  }

  showGrade = () => {
    this.setState({isGrading: !this.state.isGrading})
  }

  triggerWatsonSave = (e) => {
    if(e.key === 'Enter'){
      if (this.state.watsonInput === ''){
        alert('Press Enter Again Please')
        this.setState({confirmation: true})
      } else if(this.state.watsonInput !== ''){
        let result = []
        let hash = {}
        let watsonInputSpilt = this.state.watsonInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/[^A-Z0-9]/ig, " ").split(" ")
        let userInputSpilt = this.state.userTranscript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/[^A-Z0-9]/ig, " ").split(" ")
        let watsonInputHash = {}
        watsonInputSpilt.forEach(word => {
          watsonInputHash[word] = watsonInputHash[word] ? watsonInputHash[word] + 1 : 1;
        })
        let userInputHash = {}
        userInputSpilt.forEach(word => {
          userInputHash[word] = userInputHash[word] ? userInputHash[word] + 1 : 1
        })
        let wordRepeatCount = 0
        for (let i in userInputHash) {
           wordRepeatCount += Math.min(userInputHash[i] ? userInputHash[i] : 0, watsonInputHash[i] ? watsonInputHash[i] : 0);
           console.log(wordRepeatCount)
         }

        let lcsWatsonInput = this.state.watsonInput.replace(/[^A-Z0-9]/ig, "")
        function lcs(x,y){
        	let s,i,j,m,n,
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
        let userTranscriptLength = this.state.userTranscript.replace(/[^A-Z0-9]/ig, "").length
        let lcsSave = lcs(this.state.userTranscript,lcsWatsonInput)
        let lcsScoreSave = (((lcsSave).length)/userTranscriptLength)*100
        console.log(lcsScoreSave);

        console.log('The LCS string is ', lcsSave,' and the score is ', lcsScoreSave)
        $.ajax({method:'GET',
          url: 'http://localhost:3001/api/watson/tone/',
          data:{'myText': this.state.watsonInput}})
        .then((res) => {
          let attemptTone = {
            emotionalTone_Anger: res.document_tone.tone_categories[0].tones[0].score*100,
            emotionalTone_Disgust: res.document_tone.tone_categories[0].tones[1].score*100,
            emotionalTone_Fear: res.document_tone.tone_categories[0].tones[2].score*100,
            emotionalTone_Joy: res.document_tone.tone_categories[0].tones[3].score*100,
            emotionalTone_Sadness: res.document_tone.tone_categories[0].tones[4].score*100,
            languageTone_Analytical: res.document_tone.tone_categories[1].tones[0].score*100,
            languageTone_Confident: res.document_tone.tone_categories[1].tones[1].score*100,
            languageTone_Tentative: res.document_tone.tone_categories[1].tones[2].score*100,
            socialTone_Openness: res.document_tone.tone_categories[2].tones[0].score*100,
            socialTone_Conscientiousness: res.document_tone.tone_categories[2].tones[1].score*100,
            socialTone_Etraversion: res.document_tone.tone_categories[2].tones[2].score*100,
            socialTone_Agreeableness: res.document_tone.tone_categories[2].tones[3].score*100,
            socialTone_EmotionalRange: res.document_tone.tone_categories[2].tones[4].score*100,
          }
          this.setState({attemptTone:attemptTone}, function(){
            $.ajax({
              method: 'POST',
              url: 'http://localhost:3001/api/attempts',
              data: {
                attemptTranscript: this.state.watsonInput,
                attemptTranscriptSpilt: watsonInputHash,
                lcs: lcsSave,
                lcsScore: lcsScoreSave,
                tones: this.state.attemptTone,
                _project: this.props.selectedProject,
                _user:this.props.currentUserId
              }
            })
          })
          console.log(this.state.attemptTone);
        }, (err) => {
          console.log('error: ', err)
        })
        console.log('original spilt is ',this.state.userTranscriptSpilt);
        this.showGrade()

      }
    }
  }

  saveWatsonInput = (e) => {
    this.setState({watsonInput: e.target.value})
  }

  render () {
    return (
      <div className='SpeechAndGrade'>
        {this.state.isGrading ? <GradePage clickNewAttempt={this.props.clickNewAttempt} watsonInput={this.state.watsonInput} userTranscript={this.state.userTranscript} selectedProjectScript={this.props.selectedProjectScript}/> : <SpeechToTextBox clickNewAttempt={this.props.clickNewAttempt} saveWatsonInput={(e)=>this.saveWatsonInput(e)} showGrade={(e)=>this.showGrade(e)} triggerWatsonSave={(e)=>this.triggerWatsonSave(e)} selectedProjectScript={this.props.selectedProjectScript}/>}
      </div>
    )
  }
}

export default SpeechAndGrade
