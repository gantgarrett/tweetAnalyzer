import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <a href="#default" class="logo">Tweet Sentiment Analyzer | by Garrett G.</a>
          <div className="header-right">
            <a href="#howitworks">How it Works</a>
            <a href="#about">Contact</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header