const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('../config/databaseConn');

const todoRouter = require('../routes/todo');


const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use('/task', todoRouter);

app.get('/', (req, res) => res.send("Welcome to setting up Node.js project tutorial!"))

app.listen(port, () => console.log(`Server listening on port ${port}!`))