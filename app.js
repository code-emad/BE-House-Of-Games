const express = require('express');
const { getCategories, getReviews } = require('./controller') 
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)




//error handlers
app.use((request, response, next) => {
    response.status(404).send({msg: 'Invalid API path'})
})

app.use((error, request, response, next) => {
    console.log(error)
    response.status(500).send({msg: "Internal Server Error"})
}) 


module.exports = app