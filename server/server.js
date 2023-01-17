const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');


const app = express();

require('dotenv').config();


const dbConnect = require('./config/db');
dbConnect();


app.use(express.json());
// app.use(cors())

app.use('/users', require('./routes/userRoutes'))
// app.use('/todos', require('./routes/todoRoutes'))

const port = process.env.PORT || 3002
app.listen(port, () => console.log("Server started on port", port));