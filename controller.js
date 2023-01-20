const db = require('./db/connection')
const {fetchCategories, fetchReviews, fetchReviewById, fetchComByReviewId,
addComment, alterVotesByReview, fetchUsers, removeComment} = require('./model')

exports.getCategories = (request, response, next) => {
    fetchCategories().then((categories) => {
        response.status(200).send(categories.rows)
    }).catch(next);
    }

//refacotring taking place
// exports.getReviews = (request, response, next) => {
//     fetchReviews().then(({rows}) => {
//         response.status(200).send(rows)
//     })
// }

exports.getReviewById = (request, response, next) => {
    const reviewId = request.params.review_id
    fetchReviewById(reviewId).then((reviewById) => {
        response.status(200).send(reviewById[0])
    }).catch(next)
}

exports.getComByReviewId = (request, response, next) => {
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

exports.postComment = (request, response, next) => {
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

exports.patchReview = (request, response, next) => {
    const reviewId = request.params.review_id
    const voteAdjust = request.body.inc_votes

    alterVotesByReview([reviewId, voteAdjust])
    .then (({rows: [patchedReview]}) => {
        response.status(200).send(patchedReview)
    })
    .catch(next)
}

exports.getUsers = (request, response, next) => {
    fetchUsers()
    .then(({rows}) => {
        response.status(200).send(rows)
    }).catch(next)
}


//for task 10
exports.getReviews = (request, response, next) => {
    const filterCategory = request.query.category
    const sortByColumn = request.query.sort_by
    const orderBy = request.query.order

    fetchCategories()
    .then(({rows}) => {
        const validCats = rows.map(({slug}) => {return slug})
        return fetchReviews(filterCategory, sortByColumn, orderBy, validCats)
    })
    .then(({rows}) => {
        response.status(200).send(rows)
    })
    .catch(next)
}

exports.deleteComment = (request, response, next) => {
    const commentId = request.params.comment_id
    
    removeComment(commentId).then(() => {
        response.status(204).send()
    })
    .catch(next)



    
}










