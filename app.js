const express = require('express');
const { getCategories } = require('./controller') 
const app = express();

app.use(express.json())

app.get('/api/categories', getCategories)


app.use((error, request, response, next) => {
    response.status(404).send({msg: 'Invalid API path'})
    next(error)
})

app.use((error, request, response, next) => {
    console.log(error)
    response.status(500).send({msg: "Internal Server Error"})
}) 


module.exports = app