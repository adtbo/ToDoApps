const express = require('express');
const cors = require('cors');
const swaggerDoc = require('../swaggerDoc');

require('dotenv').config();
require('../config/databaseConn');

const todoRouter = require('../routes/todo');

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

swaggerDoc(app);
app.use('/task', todoRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`))