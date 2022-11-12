const request = require('supertest')
const app = require('../server/index')

describe('Post Endpoints', () => {
  jest.useFakeTimers();
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        city: "London",
        depdate: "2022-11-19",
      })
    expect(res.statusCode).toEqual(200)
  })
})