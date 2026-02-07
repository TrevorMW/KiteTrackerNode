import mysql from "mysql2/promise";
import { requireEnv } from "./env";

export const pool = mysql.createPool({
    host: requireEnv("DB_HOST"), 
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASS"),
    database: requireEnv("DB_NAME"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});