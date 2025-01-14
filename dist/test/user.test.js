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
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe('User API Tests', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'user'
        });
        (0, chai_1.expect)(res.status).to.equal(201);
        (0, chai_1.expect)(res.body).to.have.property('name', 'John Doe');
    }));
    it('should retrieve all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get('/api/users');
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).to.be.an('array');
    }));
});
//something
