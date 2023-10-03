import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { router } from '../routes'

const app = express()

app.use(cors())

// load environment variables
config()

const port = process.env.PORT ?? '3000'
app.set('port', port)

app.use(express.json());

app.use('/', router)

export { app, port }
