const { response } = require('./app')
const db = require('./db/connection')

exports.fetchCategories = () => {
    const sqlString = 'SELECT * FROM categories;'
    return db.query(sqlString)
}

exports.fetchReviews = () => {
    const sqlString = `SELECT 
    A.owner,
    A.title,
    A.review_id,
    A.category,
    A.review_img_url,
    A.created_at,
    A.votes,
    A.designer,
    CAST(COUNT(B.review_id) AS int) as comment_count
    FROM reviews A
    LEFT JOIN comments B
    ON A.review_id = B.review_id
    GROUP BY A.review_id
    ORDER BY A.created_at DESC
    ;`
    return db.query(sqlString)
}

exports.fetchReviewById = (reviewID) => {
    const sqlString = `SELECT 
    review_id,
    title,
    review_body,
    designer,
    review_img_url,
    votes,
    category,
    owner,
    created_at
    FROM reviews
    WHERE review_id = $1
    ;`
    return db.query(sqlString, [reviewID]).then(({rows, rowCount}) => {
        if (rowCount > 0) {
            return rows
        }
        else if (rowCount === 0) { 
            return Promise.reject({status: 404, msg: 'Review Id not found'})
        }
    })
}

exports.fetchComByReviewId = (reviewId) => {
    const sqlString = `SELECT
    comment_id,
    votes,
    created_at,
    author,
    body,
    review_id
    FROM comments
    WHERE review_id = $1
    ORDER BY created_at DESC
    ;`
    return db.query(sqlString, [reviewId])
}

exports.addComment = (IdUserBody) => {
    const sqlString = `INSERT INTO comments 
    (body, review_id, author)
    VALUES ($3, $1, $2)
    RETURNING *
    ;`
    return db.query(sqlString, IdUserBody).then(({rows, rowCount}) => {
            return rows
    })
}

exports.alterVotesByReview = (IdVote) => {
    const sqlString = `UPDATE reviews
    SET votes = votes + $2
    WHERE review_id = $1
    RETURNING *
    ;`
    return db.query(sqlString, IdVote).then(({rows, rowCount}) => {
        if (rowCount > 0) {
            return {rows}
        }
        else if (rowCount === 0) {
            return Promise.reject({status: 404, msg: 'Review Id not found'})
        }
    })
}

exports.fetchUsers = () => {
    const sqlString = `SELECT *
    FROM users
    ;`
    return db.query(sqlString)
}










