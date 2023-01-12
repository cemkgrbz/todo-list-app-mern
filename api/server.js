const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

//database connection

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/todo-mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


//routes and controllers

const Todo = require('./models/Todo');
const User = require('./models/User');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id)

	res.json(result)
})

app.get('/todo/complete/:id', async (req,res) => {

	const todo = await Todo.findById(req.params.id)

	todo.complete = !todo.complete

	todo.save()

	res.json(todo)
})

app.post('/register', async (req,res) => {

	const user = await User.add
})

app.post('/login', async (req,res) => {

	const user = await User.add
})


app.listen(3001, () => console.log("Server started on port 3001"));