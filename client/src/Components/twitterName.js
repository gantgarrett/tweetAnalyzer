import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2'
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table"
import Collapsible from 'react-collapsible'
import './twitterName.css'

class TwitterName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            tweetContent: [],
            show: false
        }

        this.toggleDiv = this.toggleDiv.bind(this)
    }

    chartReference = {}

    componentDidMount() {
        console.log(this.chartReference)
    }

    toggleDiv = () => {
        const {show} = this.state
        this.setState({ show: !show })
    }

    senduserName = (event) => {
        event.preventDefault()
        fetch('userName', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: this.state.userName})
        })
        this.getTweets()
    }

    getTweets = () => {
        fetch('/twitter')
            .then(res => res.json())
            .then(tweetContent => this.setState({tweetContent}, () => 
                console.log('tweets fetched: ', tweetContent)))
    }

    render() {
        const data = {
            labels: [
                'Positive',
                'Negative',
                'Neutral'
            ],
            datasets: [{
                data: this.state.tweetContent.slice(-1)[0],
                backgroundColor: [
                    '#1AC403',
                    '#FC2522',
                    '#CDEAEA'
                ],
                hoverBackgroundColor: [
                    '#1AC403',
                    '#FC2522',
                    '#CDEAEA'
                ]
            }]
        }

        return (
            <div className="page-wrapper">
                <div className="container">
                    <hr>
                    </hr>
                    <br>
                    </br>
                    <div className="jumbotron bg-dark text-white">
                        <h3><strong>How positive are your tweets?</strong></h3>
                        <h6><i>Tweet Sentiment Analyzer</i> uses text analysis to graph a user's <u>sentiment score.</u></h6>
                        <br>
                        </br>
                        <h4>Search for Twitter user</h4>
                            <input 
                                placeholder="@username"
                                type="text"
                                value={this.state.userName}
                                onChange={(e) => this.setState({ userName: e.target.value })}
                            />
                            <button className="analyzeButton" onClick={(e) => {this.senduserName(e); this.toggleDiv();}}>
                                <span class="glyphicon glyphicon-search"></span>analyze
                            </button>
                    </div>
                </div>
                <div className="container">
                    <div className="chart-name">
                            <Collapsible trigger="Info"
                                open={this.state.show}
                                lazyRender={true}
                                openedClassName="openChart">
                                <h3>
                                    Sentiment Analysis Diagram
                                </h3>
                                <Pie ref={(reference) => this.chartReference = reference} 
                                    data={data} 
                                />
                            </Collapsible>
                    </div>
                    <div className="table-name">
                        <Collapsible trigger="Table"
                                open={this.state.show}
                                lazyRender={true}
                                contentContainerTagName="collapse-container-table"
                                openedClassName="openTable"
                                classParentString="tableCollapse">
                            <DynamicDataTable 
                                rows = {this.state.tweetContent}
                                fieldMap = {{sentimentScore: 'Sentiment Score'}}
                                fieldsToExclude = {[/[0-9]+/]}
                                buttons = {[]}
                            />
                        </Collapsible>
                    </div>
                </div>        
            </div>              
        )
    }
}

export default TwitterName