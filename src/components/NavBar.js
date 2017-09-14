import React, {Component} from 'react'

class NavBar extends Component {
  render () {
    return (
      <nav>
        <div className='nav-wrapper'>
          <a className='brand-logo'><i className='material-icons left'>sentiment_very_satisfied</i>Welcome</a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><a href='sass.html'>Trial Without Account</a></li>
            <li><a href='badges.html'>Sign Up</a></li>
            <li><a href='collapsible.html'>Log In</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
