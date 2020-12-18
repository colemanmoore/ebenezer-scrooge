export const createEntriesTable =
`CREATE TABLE IF NOT EXISTS entries (
id SERIAL PRIMARY KEY,
user_id VARCHAR(36) DEFAULT NULL,
date TIMESTAMP NOT NULL,
title VARCHAR(36) DEFAULT '',
money INT NOT NULL
);`

export const listEntries = ``

export const dropEntriesTable = 'DROP TABLE entries'

export const createAccountsTable =
`CREATE TABLE IF NOT EXISTS accounts (
id SERIAL PRIMARY KEY,
user_id VARCHAR(36) DEFAULT NULL,
balance INT DEFAULT 0
);`

export const dropAccountsTable = 'DROP TABLE accounts'
