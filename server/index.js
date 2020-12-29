import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { initializeDatabase } from './datastore'

const app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ALLOW_ORIGIN
}))

app.use(bodyParser.json({limit: '100kb'}))

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

// app.use(csrf({ cookie: true }))

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
const staticFolder = path.resolve(__dirname, '..', 'build')
app.use(express.static(staticFolder))

app.get('/', (req, res) => {
    const indexPath = path.resolve(staticFolder, 'index.html')
    res.sendFile(indexPath, { csrfToken: req.csrfToken() })
})

// Set up DB
initializeDatabase().then(() => console.log('~ database ready ~'))

app.use('/api', routes())

export default app
