import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import {fileURLToPath} from 'url';
import {noteRoutes} from './routes/noteRoutes.js';
import {overrideMiddleware} from './utils/method-override.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use('/notes', noteRoutes);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile('index.html', '/public');
});

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });
