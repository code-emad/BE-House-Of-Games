const db = require('./db/connection')
const {fetchCategories, fetchReviews, fetchReviewById, fetchComByReviewId,
addComment, alterVotesByReview} = require('./model')

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
    const reviewId = request.params.review_id
    fetchReviewById(reviewId).then((reviewById) => {
        response.status(200).send(reviewById[0])
    }).catch(next)
}

module.exports.getComByReviewId = (request, response, next) => {
    const reviewId = request.params.review_id
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
    const reviewId = request.params.review_id
    const username = request.body.username
    const bodyPost = request.body.body
        
    fetchReviewById(reviewId)
    .then(() => {
        return addComment([reviewId, username, bodyPost])
    })
    .then((rows) => {
        response.status(201).send(rows[0])
    })
    .catch(next)
}

module.exports.patchReview = (request, response, next) => {
    const reviewId = request.params.review_id
    const voteAdjust = request.body.inc_votes

    alterVotesByReview([reviewId, voteAdjust])
    .then (({rows: [patchedReview]}) => {
        response.status(200).send(patchedReview)
    })
    .catch(next)


}











