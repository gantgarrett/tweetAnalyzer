import React, { Component } from 'react'
import TwitterName from './Components/twitterName'
import Header from './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TwitterName />
      </div>
    )
  }
}

export default App
