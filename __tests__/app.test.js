const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')

beforeEach(() => seed(testData));

afterAll(() => {db.end()})

describe('GET/api/categories', () => {
    test('should return a status code of 200', () => {
        return request(app).get('/api/categories').expect(200)
    });
    test('should return an array', () => {
        return request(app).get('/api/categories').then((response) => {
            expect(Array.isArray(response.body)).toBe(true)
        })
    });
    test('each element of array should contain key of slug + description', () => {
        return request(app).get('/api/categories').then((response) => {
            let resultArray = response.body

            expect(resultArray.length).toBe(4) 
            resultArray.forEach((category) => {
                expect(category).toHaveProperty("slug")
                expect(category).toHaveProperty("description")
            })
        })
    });
});

describe('Error Handler - Deals with api paths that does not exist', () => {
    test('resolves with 404: Not found, for routes that does not exist', () => {
        return request(app).get('/invalidAPI').expect(404).then((response) => {
            expect(response.body).toEqual({msg: 'Invalid API path'})
        })
    })
});

describe('GET/api/reviews', () => {
    test('should return a status code of 200', () => {
        return request(app).get('/api/reviews').expect(200)
    });
    test('should return an array', () => {
        return request(app).get('/api/reviews').then(({body}) => {
            expect(Array.isArray(body)).toBe(true)
        })
    });
    test('each element of the array should contain following properties', () => {
        return request(app).get('/api/reviews').then(({body}) => {
            expect(body.length).toBe(13)
            console.log(body[0])
            body.forEach((review) => {
                expect(review).toHaveProperty("owner" ,expect.any(String))
                expect(review).toHaveProperty("title" ,expect.any(String))
                expect(review).toHaveProperty("review_id" ,expect.any(Number))
                expect(review).toHaveProperty("category" ,expect.any(String))
                expect(review).toHaveProperty("review_img_url" ,expect.any(String))
                expect(review).toHaveProperty("created_at" ,expect.any(String))
                expect(review).toHaveProperty("votes" ,expect.any(Number))
                expect(review).toHaveProperty("designer" ,expect.any(String))
                expect(review).toHaveProperty("comment_count" ,expect.any(Number))
            })
        })
    });
    test('comment_count for review_id 2,3 = 3', () => {
        return request(app).get('/api/reviews').then(({body}) => {
            let review2 = body.find((review) => {return review.review_id === 2})
            let review3 = body.find((review) => {return review.review_id === 3})
            expect(review2.comment_count).toEqual(3)
            expect(review3.comment_count).toEqual(3)
        })
    });
    test('comment_count for other review ids (not 2,3) = 0', () => {
        return request(app).get('/api/reviews').then(({body}) => {
            let otherReviews = body.filter((review) => {return review.review_id !== 2 && review.review_id !== 3})
            otherReviews.forEach((review) => {
                expect(review.comment_count).toEqual(0)
            })
        })
    });
    test('date is ordered in desc order', () => {
        return request(app).get('/api/reviews').then(({body}) => {
            let firstReview = body[0]
            let lastReview = body[body.length - 1]

            expect(firstReview.created_at).toEqual('2021-01-25T11:16:54.963Z')
            expect(lastReview.created_at).toEqual('1970-01-10T02:08:38.400Z')
        })
    });
});

