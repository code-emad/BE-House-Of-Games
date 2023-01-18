const { response } = require('./app')
const db = require('./db/connection')

module.exports.fetchCategories = () => {
let sqlString = 'SELECT * FROM categories;'
    return db.query(sqlString)
}

module.exports.fetchReviews = () => {
    let sqlString = `SELECT 
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

module.exports.fetchReviewById = (reviewID) => {
    let sqlString = `SELECT 
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

module.exports.fetchComByReviewId = (reviewId) => {
    let sqlString = `SELECT
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

module.exports.addComment = (IdUserBody) => {
    let sqlString = `INSERT INTO comments 
    (body, review_id, author)
    VALUES ($3, $1, $2)
    RETURNING *;
    `
    return db.query(sqlString, IdUserBody)
}