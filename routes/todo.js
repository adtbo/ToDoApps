const router = require('express').Router();
let Todo = require('../model/todo.model');

/**
 * @swagger
 * definitions:
 *  Task:
 *   type: "object"
 *   properties:
 *    description:
 *      type: "string"
 *    doneDateTime:
 *      type: "string"
 *      format: "date-time"
 */

/**
 * @swagger
 * /task/:
 *  get:
 *    tags:
 *    - "Task"
 *    description: Get all task
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));       
});


/**
 * @swagger
 * /task/{id}:
 *  get:
 *    tags:
 *    - "Task"
 *    description: Get specific task
 *    parameters:
 *    - name: "id"
 *      in: "path"
 *      description: "id of Task to return"
 *      required: true
 *      type: "string"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/:id').get((req, res) => {
    Todo.findById(req.params.id)
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));       
});


/**
 * @swagger
 * /task/{id}:
 *  delete:
 *    tags:
 *    - "Task"
 *    description: delete existing Task
 *    parameters:
 *    - name: "id"
 *      in: "path"
 *      description: "id of Task to delete"
 *      required: true
 *      type: "string"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(todos => res.json('Task Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));       
});


/**
 * @swagger
 * /task/:
 *  post:
 *    tags:
 *    - "Task"
 *    description: Create new Task
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "task that will be created"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/Task"
 *    responses:
 *      '200':
 *        description: A successful response
 */
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


/**
 * @swagger
 * /task/{id}:
 *  post:
 *    tags:
 *    - "Task"
 *    description: Update existing Task
 *    parameters:
 *    - name: "id"
 *      in: "path"
 *      description: "id of Task to update"
 *      required: true
 *      type: "string"
 *    - in: "body"
 *      name: "body"
 *      description: "task that will be created"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/Task"
 *    responses:
 *      '200':
 *        description: A successful response
 */
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