const { describe, it, before, after } = require('mocha');
const assert = require('assert');
const supertest = require('supertest');

describe('API Suite test', () => {
  let app;
  // done é uma função do mocha para indicar finalização de uma ação
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after((done) => {
    app.close(done);
  })

  describe('/contact', () => {
    it ('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200);

      assert.strictEqual(response.text, 'contact page');
    })
  })

  describe('/login:post', () => {
    it ('should login and return HTTP Status 200 when data is valid', async () => {
      const VALID_DATA = { username: 'LeoFuna', password: 'secret' };
      const response = await supertest(app)
        .post('/login')
        .send(VALID_DATA)
        .expect(200);

      assert.strictEqual(response.text, 'Success login!');
    });

    it ('should fail return HTTP Status 401 when data is INVALID', async () => {
      const INVALID_PASSWORD = { username: 'LeoFuna', password: 'invalid' };
      const INVALID_USERNAME = { username: 'invalid', password: 'secret' };
      const responseInvalidPass = await supertest(app)
        .post('/login')
        .send(INVALID_PASSWORD)
        .expect(401);

      const responseInvalidUsername = await supertest(app)
        .post('/login')
        .send(INVALID_USERNAME)
        .expect(401);

      assert.strictEqual(responseInvalidPass.text, 'Login failed!');
      assert.strictEqual(responseInvalidUsername.text, 'Login failed!');
    });
  })

  describe('/notValidRoute', () => {
    it ('should return HTTP Status 404 when api route dont exists', async () => {
      const response = await supertest(app)
        .get('/notValidRoute')
        .expect(404);

      assert.strictEqual(response.text, 'Page Not Found');
    });
  })
})