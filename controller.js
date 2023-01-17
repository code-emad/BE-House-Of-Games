const db = require('./db/connection')
const {fetchCategories, fetchReviews, fetchReviewById, fetchComByReviewId} = require('./model')

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

module.exports.getReviewById = (request, response, next) => {
    let reviewId = request.params.review_id
    fetchReviewById(reviewId).then(({rows, rowCount}) => {
       if (rowCount > 0) {
        response.status(200).send(rows[0])}
        else if (rowCount === 0) {
            return Promise.reject({status: 404, msg: 'Review Id not found'})
        }
    }).catch(next)
}

module.exports.getComByReviewId = (request, response, next) => {
    let reviewId = request.params.review_id
    fetchComByReviewId(reviewId).then(({rows}) => {
        response.status(200).send(rows)
    })
}











