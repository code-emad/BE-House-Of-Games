const express = require('express');
const { getCategories, getReviews, getReviewById, getComByReviewId, postComment, patchReview, getUsers} = require('./controller') 
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews/:review_id/comments', getComByReviewId)

app.post('/api/reviews/:review_id/comments', postComment)

app.patch('/api/reviews/:review_id', patchReview)

app.get('/api/users', getUsers)

//error handlers
app.use((request, response, next) => {
    response.status(404).send({msg: 'Invalid API path'})
})

app.use((error, request, response, next) => {
    if (error.status) {
    response.status(error.status).send(error.msg)
    }
    else {
        next(error)
    }
})

app.use((error, request, response, next) => {
if (error.code === '22P02') {
    response.status(400).send({msg: 'Not valid Review Id'})
}
if (error.code === '23502' || error.code === '23503') {
    response.status(400).send({msg: 'Bad Request - Invalid info sent'})
}
else {
    next(error)
}
})

app.use((error, request, response, next) => {
    console.log(error, "last error handler")
    response.status(500).send({msg: "Internal Server Error"})
}) 




module.exports = app