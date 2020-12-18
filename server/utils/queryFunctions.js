import { pool } from '../models/pool';
import {
    listEntries,
    dropEntriesTable,
    createEntriesTable,
    createAccountsTable,
    dropAccountsTable
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
        await pool.query(q);
        if (index + 1 === stop) resolve();
    });
});

export const dropTables = () => executeQueryArray([ dropEntriesTable, dropAccountsTable ]);
export const createTables = () => executeQueryArray([ createAccountsTable, createEntriesTable ]);
