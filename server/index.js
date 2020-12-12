import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path';
import bodyParser from 'body-parser'
import api from './api-mock'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
mongoose.Promise = global.Promise;

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

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname)));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// connect to db
/*
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
}).then(db => {
    // api router
    app.use('/api', api({ db }));

    app.server.listen(process.env.PORT, () => {
        console.log(`Ready on port ${app.server.address().port}`);
    });
});
*/

app.use('/api', api());

export default app;
