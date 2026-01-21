import express from 'express'
import { connectSQL } from './config/sql.connection'
import routes from '../src/routes/routes';
import cors from 'cors'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
connectSQL()
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server start on http://localhost:${PORT}`)
})