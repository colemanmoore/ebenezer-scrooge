import { pool } from '../models/pool';

const createEntriesTable =
`CREATE TABLE IF NOT EXISTS entries (
id SERIAL PRIMARY KEY,
user_id VARCHAR(36) DEFAULT NULL,
date TIMESTAMP NOT NULL,
title VARCHAR(36) DEFAULT '',
money INT NOT NULL
);`

const createAccountsTable =
`CREATE TABLE IF NOT EXISTS accounts (
id SERIAL PRIMARY KEY,
user_id VARCHAR(36) DEFAULT NULL,
balance INT DEFAULT 0
);`

const executeQueryArray = async arr => new Promise(resolve => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
        await pool.query(q);
        if (index + 1 === stop) resolve();
    });
});

export const initializeDatabase = () => executeQueryArray([ createAccountsTable, createEntriesTable ]);
