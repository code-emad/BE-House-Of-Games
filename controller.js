const db = require('./db/connection')
const {fetchCategories, fetchReviews, fetchReviewById, fetchComByReviewId,
addComment} = require('./model')

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
    fetchReviewById(reviewId).then((reviewById) => {
        response.status(200).send(reviewById[0])
    }).catch(next)
}

module.exports.getComByReviewId = (request, response, next) => {
    let reviewId = request.params.review_id
    fetchReviewById(reviewId)
    .then(() => {
        return fetchComByReviewId(reviewId)
    })
    .then(({rows, rowCount}) => {
            response.status(200).send(rows)
    })
    .catch(next)
}

module.exports.postComment = (request, response, next) => {
    let reviewId = request.params.review_id
    let username = request.body.username
    let bodyPost = request.body.body
        
    fetchReviewById(reviewId)
    .then(() => {
        return addComment([reviewId, username, bodyPost])
    })
    .then((rows) => {
        response.status(201).send(rows[0])
    })
    .catch(next)
}











