import express from 'express';
import { connectSQL } from './config/sql.connection';
import routes from '../src/routes/routes';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { initSocket } from './sockets/socket';
import cookie from 'cookie-parser'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// SQL connection
connectSQL();

app.use(cookie())
app.use(express.json());
// Routes
app.use('/api', routes);

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
