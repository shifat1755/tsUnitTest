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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("got call in createUser");
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }
    try {
        const user = new user_model_1.default(req.body);
        const savedUser = yield user.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
exports.deleteUser = deleteUser;
