import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path';
import bodyParser from 'body-parser'
import api from './api'
import dotenv from 'dotenv'
import { createTables } from './utils/queryFunctions'

dotenv.config();

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
    exposedHeaders: ["Link"]
}));

app.use(bodyParser.json({
    limit: '100kb'
}));

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname)));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// set up db
createTables().then(() => {
    console.log('~ database initialized ~')
})

app.use('/api', api());

export default app;
