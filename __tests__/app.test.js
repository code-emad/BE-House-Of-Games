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

describe('Deals with api paths that does not exist', () => {
    test('resolves with 404: Not found, for routes that does not exist', () => {
        return request(app).get('/api/invalidAPI').expect(404)
        })
    });

