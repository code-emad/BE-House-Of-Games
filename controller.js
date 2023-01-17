const db = require('./db/connection')
const {fetchCategories} = require('./model')

module.exports.getCategories = (request, response, next) => {
    fetchCategories().then((categories) => {
        response.status(200).send(categories.rows)
    })
    }

    











