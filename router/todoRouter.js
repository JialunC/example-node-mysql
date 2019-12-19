const express = require('express');
const router = express.Router();
const connection = require('../service/conn');
const query = require('../service/query');


router.get('/', async (req, res) => {
    console.log('asd')
    // callback
    // todoService.getAll(res.send);
    res.send('te');
});

// we use post to create an item
router.post('/', function (req, res) {
    res.send(todoService.add(req.body));
});


// we want to get a particular todoItem by id
// /api/todos/1
router.get('/:id(\\d+)/', function (req, res) {
    const todoId = req.params.id;
    // todoService.findOne(todoId, res.send);
    todoService.findOne(todoId, (x => res.send(x)));
});

// we want an endpoint filtering todo by name
// /api/todos/search?task=sk
// /api/todos/:id([a-zA-Z]+)  // char only url
router.get('/search', (req, res) => {
    const taskQueryString = req.query.task;
    todoService.findByName(taskQueryString, res.send);
});

router.put('/:id', (req, res) => {
    res.send(todoService.update(req.params.id, req.body));
});

router.delete('/:id', (req, res) => {
    res.send(todoService.remove(req.params.id));
});

module.exports = router;
