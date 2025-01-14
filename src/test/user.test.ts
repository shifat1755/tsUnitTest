import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../server';
import User, { IUser } from '../models/user.model';

describe('User Controller', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('POST /api/users/', () => {
    it('should create a user successfully', async () => {
      const mockUser: IUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' } as IUser;
      sandbox.stub(User.prototype, 'save').resolves(mockUser);

      const response = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(mockUser);
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const mockUsers: IUser[] = [
        { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
        { _id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' },
      ] as IUser[];
      sandbox.stub(User, 'find').resolves(mockUsers);

      const response = await request(app).get('/api/users');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockUsers);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const mockUser: IUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' } as IUser;
      sandbox.stub(User, 'findById').resolves(mockUser);

      const response = await request(app).get('/api/users/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockUser);
    });

    it('should return 404 if user is not found', async () => {
      sandbox.stub(User, 'findById').resolves(null);

      const response = await request(app).get('/users/999');

      expect(response.status).to.equal(404);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user successfully', async () => {
      const mockUpdatedUser: IUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' } as IUser;
      sandbox.stub(User, 'findByIdAndUpdate').resolves(mockUpdatedUser);

      const response = await request(app)
        .put('/api/users/1')
        .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockUpdatedUser);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user successfully', async () => {
      sandbox.stub(User, 'findByIdAndDelete').resolves();

      const response = await request(app).delete('/api/users/1');

      expect(response.status).to.equal(204);
    });
  });
});