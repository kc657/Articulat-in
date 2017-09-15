import React, {Component} from 'react'
import SignupModal from './SignupModal.js'
import SignInModal from './SignInModal.js'
import $ from 'jquery'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpUserName: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpPassword: '',
      userName: '',
      password: '',
      userId: '',
      isLoggedIn: false,
      isSignInOpen: false,
      isSignUpOpen: false,
    }
  }

  handleChange = (event) => {
    let userInfo = $(event.target).closest('.validate').data('id-type');
    this.setState({[userInfo]: event.target.value})
  }

  toggleSignupModal = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/signup',
      data: {
        first_name: this.state.signUpFirstName,
        last_name: this.state.signUpLastName,
        password: this.state.signUpPassword,
        username: this.state.signUpUserName
      }
    })
    .then((res) => {
      console.log(res)
      this.toggleSignupModal()
    },
    (err) => {
      alert('User already exists')
    })
  }

  toggleSignInModal = () => {
    this.setState({isSignInOpen: !this.state.isSignInOpen})
  }

  handleUserNameChange = (event) => {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleSignInSubmit = (event) => {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/login',
      data: {
        username: this.state.userName,
        password: this.state.password
      }
    })
    .then((res) => {
      console.log(res, 'User is authenticated')
      this.setState({userId: res._id, isLoggedIn: true})
      this.toggleSignInModal()
    },
    (err) => {
      alert('Your Credentials Are Incorrect')
      this.setState({
        userName: '',
        password: '',
        userId: '',
        isLoggedIn: false
      })
    })
  }

  handleLogOut = (event) => {
    this.setState({isLoggedIn:false})
  }

  render () {
    if (!this.state.isLoggedIn) {
      return (
        <header>
          <nav>
            <a className='brand-logo'><i className='material-icons left'>sentiment_very_satisfied</i>Welcome</a>
            <ul id='navList' className='right hide-on-med-and-down'>
              <li><a onClick={(event)=>this.toggleSignInModal(event)}>Sign In</a></li>
              <li><a onClick={(event)=>this.toggleSignupModal(event)}>Sign Up</a></li>
            </ul>
          </nav>
          <SignupModal isSignUpOpen={this.state.isSignUpOpen} toggleSignupModal={(event)=>this.toggleSignupModal(event)} handleSignupSubmit={(event)=>this.handleSignupSubmit(event)} handleChange={(event)=>this.handleChange(event)}
          />
          <SignInModal isSignInOpen={this.state.isSignInOpen} toggleSignInModal={(event)=>this.toggleSignInModal(event)} handleSignInSubmit={(event)=>this.handleSignInSubmit(event)} handleChange={(event)=>this.handleChange(event)}
          />
        </header>
      )
    }
    return (
      <header>
        <nav className='light-blue lighten-1'>
          <a className='brand-logo'>Way Way Far</a>
          <ul id='navList' className='right hide-on-med-and-down'>
            <li><a>Welcome {this.userName}!</a></li>
            <li><a onClick={this.handleLogOut}>Log Out</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default NavBar
