const router = require('express').Router();
let Todo = require('../model/todo.model');

router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/:id').get((req, res) => {
    Todo.findById(req.params.id)
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(todos => res.json('Task Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));       
});

router.route('/').post((req, res) => {

    const todo = {
        description : req.body.description,
        doneDateTime : null
    };

    const newTodo = new Todo({...todo});

    newTodo.save()
        .then(() => res.json('Task Added Succesfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            todo.description = req.body.description
            todo.doneDateTime = req.body.doneDateTime

            todo.save()
                .then(() => res.json('Task updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;