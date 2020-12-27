import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { initializeDatabase } from './datastore/index'

let app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.json({limit: '100kb'}))

// for parsing application/json
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname)))

// Always return the main index.html, so react-router renders the route in the client
// TODO set CSRF token on index.html
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

// Set up DB
initializeDatabase().then(() => console.log('~ database initialized ~'))

app.use('/api', routes())

export default app
