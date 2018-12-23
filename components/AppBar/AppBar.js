import React from 'react';
import { Component } from 'react';
import s from './AppBar.scss';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ViewHeadLine from 'material-ui/svg-icons/action/view-headline';
import Clear from 'material-ui/svg-icons/content/clear';
import logo from '../../assets/img/ed.png';
import Link from 'next/link'



const style = {
  icon: {
    width: 48,
    height: 48,
    color: '#aaccff'
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24
  }
}

export default class AppBar extends Component {
  constructor(props) {
    super(props);
    let burgerStyleMedium = Object.assign({}, style.medium);
    let closeStyleMedium = Object.assign({display: 'none'}, style.medium);

    this.state = {
      barStyle: {
        bgColor: '',
        height: '9em'
      },
      burgerStyle: burgerStyleMedium,
      closeStyle: closeStyleMedium
    };
  }

  // Seems to be required w/ mui even if I'm just using an Icon
  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentDidMount() {
     window.addEventListener('scroll', () => { this.handleScroll(); });
  }

  // Trying not to mess with state object in case I make it richer later
  // Obviously I didnt understand how setState worked when i wrote that
  handleScroll () {
    this.setState((prevState, props) => {
      var newState = prevState;
      if (pageYOffset < 50) {
        newState.barStyle.bgColor = '';
        newState.barStyle.height = '9em';
      }
      else {
        newState.barStyle.bgColor = '#1d2266dd';
        // Cte media query lulz
        var height = screen.width < 480 ? '6em' : '3em';
        newState.barStyle.height = height;
      }

      return newState
    })

  }

  displayMobileMenu(show) {
    this.setState((state, props) => {
      state.burgerStyle.display = show ? 'none' : 'block';
      state.closeStyle.display = show ? 'block' : 'none';
      // I should improve this badly
      document.querySelector('.mobile-menu').style.display = show ? 'block' : 'none'
    })
  }

  render () {
    return (
      <div className="appBar" style={{
        backgroundColor: this.state.barStyle.bgColor,
        height: this.state.barStyle.height,
        transition: 'height 0.7s, background-color 0.5s'
       }}>
        <a href="/"  className="logo">
          <img src={logo} alt="edcorp" style={{height: this.state.barStyle.height}}/>
        </a>
        <div className="app-bar-navigation">
          <a href="/" className="nav-button">Home</a>

          <a href="/Portfolio" className="nav-button">Portfolio</a>
          <Link href="/Resume">
            <a className="nav-button">Resume</a>
          </Link>

        </div>
        <div className="app-bar-nav-mobile">
          <IconButton
           className="menu-button--burger"
           iconStyle={style.icon}
           style={this.state.burgerStyle}
           onClick={() => {this.displayMobileMenu(true)}}
          >
            <ViewHeadLine />
          </IconButton>

          <IconButton
           className="menu-button--cross"
           iconStyle={style.icon}
           style={this.state.closeStyle}
           onClick={() => {this.displayMobileMenu(false)}}
          >
            <Clear />
          </IconButton>
        </div>
        <div className="mobile-menu">
          <div className="nav">
            <a onClick={() => {this.displayMobileMenu(false)}} href="/" className="nav-button">Home</a>

            <a onClick={() => {this.displayMobileMenu(false)}} href="/Portfolio" className="nav-button">Portfolio</a>
            <a onClick={() => {this.displayMobileMenu(false)}} href="/Resume" className="nav-button">Resume</a>
          </div>
        </div>
      </div>
    );
  }
}

AppBar.childContextTypes = {
  muiTheme: () => null
}
