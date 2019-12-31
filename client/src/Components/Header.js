import React, { Component } from 'react'
import './Header.css'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class Header extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <a href="#default" class="logo">Tweet Sentiment Analyzer | by Garrett G.</a>
          <div className="header-right">
            <button className="btn info" onClick={this.openModal}>How it Works</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => this.subtitle = subtitle}>Hello!</h2>
              <button onClick={this.closeModal}>close</button>
              <br></br>
              <div><strong>Tweet Sentiment Analyzer</strong> was made with <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>,  
                <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"> Node.js</a>,  
                <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer"> Express.js</a>, 
                <a href="https://developer.twitter.com/en/docs" target="_blank" rel="noopener noreferrer"> Twitter API</a>, and the
                <a href="https://www.npmjs.com/package/sentiment" target="_blank" rel="noopener noreferrer"> Sentiment</a> node package.</div>
                <br></br>
                <p>
                  This app uses the Twitter API to fetch a specific user's timeline.
                  The Sentiment node package analyzes the tweets and gives each tweet a score: Positive, Negative, or Neutral.
                  You can find out more information <a href="https://www.npmjs.com/package/sentiment" target="_blank" rel="noopener noreferrer"> here</a> about how each tweet is scored.
                </p>
                <p>
                  Since this is app uses the free version of the Twitter API, only a certain number of tweets are retrieved (not the entire timeline).
                </p>
                <p>
                  You can type in any username and the website will automatically gather the latest tweets and calculate a sentiment score for each of them.
                </p>
                <p>
                  The goal was to create a fun website which uses text analysis to see how positive someone's tweets are.
                </p>
            </Modal>
            {/*<a href="#howitworks">How it Works</a>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Header