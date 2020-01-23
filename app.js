const express = require('express');
const cors = require('cors');
const connection = require('./service/conn');
const query = require('./service/query');
const app = express();
app.use(express.json());
app.use(cors());

const webport = process.env.PORT || 5000;
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

app.post('/addtask', async (req, res) => {
    const payload = req.body
    const result = await query(
        connection,
        `INSERT INTO tasks VALUES (${payload['id']}, '${payload['task']}', '${payload['status']}')`
    )
    res.send(result)
})

app.put('/:id', async (req, res) => {
    const {id} = req.params
    const payload = req.body
    const result = await query(
        connection,
        `UPDATE tasks SET task = '${payload['task']}' WHERE ID = ${id}`
    )
    res.send(result)
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params
    const result = await query(
        connection,
        `DELETE FROM tasks WHERE ID = ${id}`
    )
    res.send(result)
})

app.listen(webport, () => console.log(`Example app listening on port ${webport}!`));

