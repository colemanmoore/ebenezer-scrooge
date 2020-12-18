import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const cfg = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST
}

const connectionString = `postgresql://${cfg.user}:${cfg.password}@${cfg.host}:5432/${cfg.database}`

export const pool = new Pool({ connectionString });