const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

require('dotenv').config();


const dbConnect = require('./config/db');
dbConnect();


app.use(express.json());
app.use(cors())

app.use('/users', require('./routes/userRoutes'))
app.use('/todos', require('./routes/todoRoutes'))

const port = process.env.PORT || 3002
app.listen(port, () => console.log("Server started on port 3001"));


//database connection

// mongoose.set('strictQuery',false);
// mongoose.connect("mongodb://127.0.0.1:27017/todo-mern", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("Connected to DB"))
//     .catch(console.error);


//routes and controllers

// const Todo = require('./models/Todo');
// const User = require('./models/User');

//todo list

// app.get('/todos', async (req, res) => {
// 	const todos = await Todo.find();

// 	res.json(todos);
// });

// app.post('/todo/new', (req, res) => {
// 	const todo = new Todo({
// 		text: req.body.text
// 	})

// 	todo.save();

// 	res.json(todo);
// });

// app.delete('/todo/delete/:id', async (req, res) => {
// 	const result = await Todo.findByIdAndDelete(req.params.id)

// 	res.json(result)
// })

// app.get('/todo/complete/:id', async (req,res) => {

// 	const todo = await Todo.findById(req.params.id)

// 	todo.complete = !todo.complete

// 	todo.save()

// 	res.json(todo)
// })

//User

// const SALT_ROUNDS = 10

// app.post('/register', async (req,res) => {

// 	try {
		
// 		const hashedPass = await bcrypt.hash(req.body.password, 10)

// 	} catch (error) {
		
// 	}

// 	// const user = await User.add

// 	// const salt = await bcrypt.genSalt(SALT_ROUNDS)
// 	// const hashedPass = await bcrypt.hash(req.body.password, salt)

// 	// req.body.password = hashedPass

// 	const userRegister = await User.create(req.body)
//     console.log("🚀 ~ register ~ user", userRegister)

// 	res.send(userRegister)


// })

// app.post('/login', async (req,res) => {

// 	const userLogin = await User.findOne({
// 		$or: [{username: req.body.username}, {email: req.body.email}]
// 	}).select('-__v')

// 	console.log("🚀 ~ login ~ user", user)

// 	if (!userLogin) return res.send({success: false, errorId: 1})

// 	const passMatch = await bcrypt.compare(req.body.password, user.password)
// 	if (passMatch) {
// 		const newUser = user.toObject()
            
//             delete newUser.password

//             res.send({success: true, user: newUser})

// 	} else return res.send({success: false, errorId: 1})



// 	// res.send(userLogin)

// })

// app.get('/userlist', async (req, res) => {

// 	const userList = await User.find().select('-password -__v')
//     console.log("🚀 ~ userList", userList)

// 	res.send(userList)
// })

