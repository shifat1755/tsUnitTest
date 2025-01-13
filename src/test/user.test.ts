import {expect} from 'chai';
import request from 'supertest';
import app from '../server';

describe('User API Tests', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'user'
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', 'John Doe');
  });

  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
