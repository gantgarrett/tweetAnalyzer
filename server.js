const express = require('express')
const Twit = require('twit')
const Sentiment = require('sentiment')
const bodyParser = require('body-parser')
const sentiment = new Sentiment()

const app = express()
const port = process.env.PORT || 5000

const T = new Twit({
    //twitter credentials
    app_only_auth: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/userName', function(req, res) {
    userName = req.body.userName;
    app.get('/twitter', (req, res) => {
        //var username = {screen_name: userName}
        T.get('statuses/user_timeline', {
            screen_name: userName,
            count: 200,
            trim_user: true,
            exclude_replies: true,
            include_rts: false},
            function(error, tweets, response) {
            if (!error) {
                let tweetsText = [{}]
                let positiveScore = []
                let negativeScore = []
                let neutralScore = []
                let sumArr = []

                for(let i = 0; i < tweets.length; i++) {
                    let result = sentiment.analyze(tweets[i].text)

                    if (result.score === 0) {
                        result.score = 'Neutral'
                        neutralScore.push(0)
                    }
                    if (result.score >= 1) {
                        result.score = 'Positive'
                        positiveScore.push(1)
                    }
                    if (result.score < 0) {
                        result.score = 'Negative'
                        negativeScore.push(-1)
                    }

                    let sentimentScore = result.score
                    let tweet = tweets[i].text

                    tweetsText.push({sentimentScore, tweet})
                }
                sumArr.push(positiveScore.length, negativeScore.length, neutralScore.length)
                tweetsText.push(sumArr)
                res.json(tweetsText)
            }
        })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
