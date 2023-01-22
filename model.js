const db = require('./db/connection')
const fs = require('fs/promises')

exports.fetchCategories = () => {
    const sqlString = 'SELECT * FROM categories;'
    return db.query(sqlString)
}

exports.fetchReviews = (filterCategory, sortByColumn, orderBy, validCats) => {
//deals with invalid sortby
if (!['owner', 'title', 'review_id', 'category', 'review_img_url', 'created_at', 'votes', 'designer', 'comment_count', undefined].includes(sortByColumn)) {
    return Promise.reject({status: 400, msg: 'Bad Request - Invalid query parameters'})
}
//deals with invalid filterCategory
if(!validCats.includes(filterCategory) && filterCategory !== undefined) {
    return Promise.reject({status: 400, msg: 'Bad Request - Invalid query parameters'})
} 
//deals with invalid orderBy
if(orderBy !== undefined && !['ASC', 'DESC'].includes(orderBy.toUpperCase()) && orderBy !== undefined) {return Promise.reject({status: 400, msg: 'Bad Request - Invalid query parameters'})}

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

    if (filterCategory !== undefined) {
        sqlString = sqlString.replace(' = B.review_id'
        ,` = B.review_id 
        WHERE category = '${filterCategory}'`)
    }

    if (sortByColumn !== undefined) {
        sqlString = sqlString.replace('A.created_at DESC'
        , `A.${sortByColumn} DESC`)
    }

    if (orderBy !== undefined && orderBy.toUpperCase() === 'ASC') {
        sqlString = sqlString.replace('DESC'
        , 'ASC')
    }

    return db.query(sqlString)
}

exports.fetchReviewById = (reviewID) => {
    const sqlString = `SELECT 
    A.review_id,
    A.title,
    A.review_body,
    A.designer,
    A.review_img_url,
    A.votes,
    A.category,
    A.owner,
    A.created_at,
    CAST(COUNT(B.review_id) AS int) AS comment_count
    FROM reviews A
    LEFT JOIN comments B
    ON A.review_id = B.review_id
    WHERE A.review_id = $1
    GROUP BY A.review_id
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

exports.removeComment = (commentId) => {
    const sqlString = `DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *
    ;`

    return db.query(sqlString, [commentId])
    .then(({rowCount}) => {
        if (rowCount === 0) {
            return Promise.reject({status: 404, msg: 'Comment Id not found'})
        }
    })
}

exports.fetchAPI = () => {
    return fs.readFile('./endpoints.json', "utf-8").then((endpoints) => {
        return JSON.parse(endpoints)
    })
}










