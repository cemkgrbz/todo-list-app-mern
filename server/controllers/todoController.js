const Todo = require('../models/Todo');


module.exports.list = async (req, res) => {

    try {

        const todos = await Todo.find();

	    res.json({success: true, todos});

    } catch (error) {
        console.log("list error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.add = async (req, res) => {

    try {

        const todo = new Todo({
            text: req.body.newTodo
        })
    
        todo.save();
    
        res.json({success: true, todo});

    } catch (error) {
        console.log("add error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.delete = async (req, res) => {

    try {

        const result = await Todo.findByIdAndDelete(req.params.id)

	    res.json(result)

    } catch (error) {
        console.log("delete error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.complete = async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id)

	    todo.complete = !todo.complete

	    todo.save()

	    res.json(todo)

    } catch (error) {

        console.log("complete error", error.message)

        res.send({success: false, error: error.message})
    }
   
}