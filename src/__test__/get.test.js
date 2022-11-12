const app = require('../server/index.js');
const req = require('supertest');

//testing
describe('Testing the get route', () => {
    test('Testing the get route', async() => {
        const response = await req(app).get('/'); // error here 
        expect(response.status).toBe(200);

    });
})