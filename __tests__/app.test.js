const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const sorted = require('jest-sorted')

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
            expect(body).toBeSortedBy('created_at', {descending: true})
        })
    });
});

describe('GET/api/reviews:review_id', () => {
    test('should return a status code of 200', () => {
        return request(app).get('/api/reviews/1').expect(200)
    });
    test('should contain the following keys', () => {
        return request(app).get('/api/reviews/1').then(({body}) => {
            expect(body).toHaveProperty("review_id", expect.any(Number))
            expect(body).toHaveProperty("title", expect.any(String))
            expect(body).toHaveProperty("review_body", expect.any(String))
            expect(body).toHaveProperty("designer", expect.any(String))
            expect(body).toHaveProperty("review_img_url", expect.any(String))
            expect(body).toHaveProperty("votes", expect.any(Number))
            expect(body).toHaveProperty("category", expect.any(String))
            expect(body).toHaveProperty("owner", expect.any(String))
            expect(body).toHaveProperty("created_at", expect.any(String))
        })
    });
    //error handling
    test('if id is valid but not found returns 404 ID not found', () => {
        return request(app).get('/api/reviews/14').expect(404).then(({text}) => {
            expect(text).toBe("Review Id not found")
        })
    });
    test('if ID is not valid, returns 400 Not valid ID', () => {
        return request(app).get('/api/reviews/cheese').expect(400).then(({body}) => {
            expect(body.msg).toBe("Not valid Review Id")
        })
    });
});

describe('GET/api/reviews/:review_id/comments', () => {
    test('should return a status code of 200 ', () => {
        return request(app).get('/api/reviews/1/comments').expect(200)
    });
    test('should return an array', () => {
        return request(app).get('/api/reviews/1/comments').then(({body}) => {
            expect(Array.isArray(body)).toEqual(true)
        })
    });
    test('each element in the array should contain the following keys', () => {
        return request(app).get('/api/reviews/2/comments').then(({body}) => {
            expect(body.length).toBe(3)
            body.forEach((comment) => {
                expect(comment).toEqual(
                    expect.objectContaining({
                       comment_id: expect.any(Number),
                       votes: expect.any(Number),
                       created_at: expect.any(String),
                       author: expect.any(String),
                       body: expect.any(String),
                       review_id: expect.any(Number)
                    })
                )
            })
        })
    });
    //error handling
});

