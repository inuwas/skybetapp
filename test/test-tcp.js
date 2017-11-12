'use strict';

/*
 * Module dependencies.
 */

const test = require('tape');
const request = require('supertest');
const { app } = require('../server');

test('tcp page', t => {
  request(app)
    .get('/tcp')
    .expect(200)
    .end(t.end);
});

test('Response Data', () => {
  request(app)
  .get('/tcp')
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err) => {
    if (err) {
      throw err;
    }
  });
});


test.onFinish(() => process.exit(0));