const express = require('express');
const cors = require('cors');
const connection = require('./service/conn');
const query = require('./service/query');
const app = express();
app.use(express.json());
app.use(cors());

const webport = 5000;
app.get('/favicon.ico', (req, res) => res.status(204))
app.get('/', async (req, res) => {
    const results = await query(connection, 'SELECT * FROM tasks').catch(console.log);
    res.json(results);
})

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const results = await query(connection, `SELECT * FROM tasks WHERE ID =${id}`).catch(console.log);
    res.send(results);
});

app.post('/add', async (req, res) => {
    const payload = req.body
    console.log(payload)
    const results = await query(connection, `INSERT INTO tasks VALUES (${payload['id']}, '${payload['name']}', '${payload['status']}')`).catch(console.log);
    res.send(results);
});

app.listen(webport, () => console.log(`Example app listening on port ${webport}!`));

