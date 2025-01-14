"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const server_1 = __importDefault(require("../server"));
const user_model_1 = __importDefault(require("../models/user.model"));
describe('User Controller', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('POST /api/users/', () => {
        it('should create a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
            sandbox.stub(user_model_1.default.prototype, 'save').resolves(mockUser);
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/api/users')
                .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });
            (0, chai_1.expect)(response.status).to.equal(201);
            (0, chai_1.expect)(response.body).to.deep.equal(mockUser);
        }));
    });
    describe('GET /api/users', () => {
        it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [
                { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
                { _id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' },
            ];
            sandbox.stub(user_model_1.default, 'find').resolves(mockUsers);
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/users');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.deep.equal(mockUsers);
        }));
    });
    describe('GET /api/users/:id', () => {
        it('should return a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
            sandbox.stub(user_model_1.default, 'findById').resolves(mockUser);
            const response = yield (0, supertest_1.default)(server_1.default).get('/api/users/1');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.deep.equal(mockUser);
        }));
        it('should return 404 if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            sandbox.stub(user_model_1.default, 'findById').resolves(null);
            const response = yield (0, supertest_1.default)(server_1.default).get('/users/999');
            (0, chai_1.expect)(response.status).to.equal(404);
        }));
    });
    describe('PUT /api/users/:id', () => {
        it('should update a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUpdatedUser = { _id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
            sandbox.stub(user_model_1.default, 'findByIdAndUpdate').resolves(mockUpdatedUser);
            const response = yield (0, supertest_1.default)(server_1.default)
                .put('/api/users/1')
                .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.deep.equal(mockUpdatedUser);
        }));
    });
    describe('DELETE /api/users/:id', () => {
        it('should delete a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            sandbox.stub(user_model_1.default, 'findByIdAndDelete').resolves();
            const response = yield (0, supertest_1.default)(server_1.default).delete('/api/users/1');
            (0, chai_1.expect)(response.status).to.equal(204);
        }));
    });
});
