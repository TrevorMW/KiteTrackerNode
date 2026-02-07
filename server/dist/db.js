"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("./env");
exports.pool = promise_1.default.createPool({
    host: (0, env_1.requireEnv)("DB_HOST"),
    user: (0, env_1.requireEnv)("DB_USER"),
    password: (0, env_1.requireEnv)("DB_PASS"),
    database: (0, env_1.requireEnv)("DB_NAME"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//# sourceMappingURL=db.js.map