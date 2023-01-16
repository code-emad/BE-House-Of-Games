const express = require('express');
const { getCategories } = require('./controller') 
const app = express();

app.get('/api/categories', getCategories)


app.use( (error, request, response, next) => {
    console.log(error)
    response.status(404).send()
    next(error)
})

app.use((error, request, response, next) => {
    console.log(error)
    response.status(500).send({msg: "Internal Server Error"})
}) 


module.exports = app