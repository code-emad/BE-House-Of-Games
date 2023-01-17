const db = require('./db/connection')
const {fetchCategories, fetchReviews} = require('./model')

module.exports.getCategories = (request, response, next) => {
    fetchCategories().then((categories) => {
        response.status(200).send(categories.rows)
    }).catch(next);
    }

module.exports.getReviews = (request, response, next) => {
    fetchReviews().then(({rows}) => {
        response.status(200).send(rows)
    })
    
}











