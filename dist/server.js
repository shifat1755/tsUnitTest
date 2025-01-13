"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
app.get('/', (req, res) => {
    res.json({ status: 'ok',
        uptime: process.uptime() });
});
(0, database_1.dbConnection)().then(() => app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})).catch(err => { console.error('Failed to connect to the database', err); });
exports.default = app;
