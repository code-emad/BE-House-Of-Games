const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')

beforeEach(() => seed(testData));

afterEach(() => {db.end()})

describe('GET/api/categories', () => {
    test('should ', () => {
        
    });
});