const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description:{
        type: String,
        required: false,
        trim: true,
        minLength: 8
    },
    doneDateTime:{
        type: Date,
        required: false,
        unique: false
    },
}, {
    timestamps: true,
});

const todo = mongoose.model('Todos', todoSchema);

module.exports = todo;