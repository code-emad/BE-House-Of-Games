const express = require('express');
const { getCategories, getReviews, getReviewById } = require('./controller') 
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReviewById)



//error handlers
app.use((request, response, next) => {
    response.status(404).send({msg: 'Invalid API path'})
})

app.use((error, request, response, next) => {
    response.status(error.status).send(error.msg)
})

app.use((error, request, response, next) => {
if (error.code === 'ERR_HTTP_INVALID_STATUS_CODE') {
    response.status(400).send({msg: 'Not valid Review Id'})
}
next(error)
})

app.use((error, request, response, next) => {
    console.log(error.code)
    response.status(500).send({msg: "Internal Server Error"})
}) 


module.exports = app