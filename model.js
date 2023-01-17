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