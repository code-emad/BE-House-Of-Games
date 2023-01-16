const db = require('./db/connection')

module.exports.fetchCategories = () => {
let sqlString = 'SELECT * FROM categories;'
    return db.query(sqlString)
}