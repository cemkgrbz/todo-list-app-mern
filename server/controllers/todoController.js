const Todo = require('../models/Todo');
const User = require('../models/User')


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
        console.log('Add', req.body)
        const user = await User.findByIdAndUpdate(
            {_id: req.body.user},
            {$push: {todos: {text: req.body.text}}},
            {new: true}
        )
        console.log("🚀 ~ file: todoController.js:30 ~ module.exports.add= ~ user", user)
    
        res.json({success: true, user});

    } catch (error) {
        console.log("add error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.delete = async (req, res) => {

    try {

        console.log("delete - ", req.body)

        const user = await User.findById(req.body.user)
        console.log("🚀 ~ file: todoController.js:47 ~ module.exports.delete ~ user", user)

        const deletedTodo = user.todos.filter(item => item._id.toString() !== req.body.id)
        console.log("🚀 ~ file: todoController.js:50 ~ module.exports.delete ~ deletedTodo", deletedTodo)

        const updatedUser = await User.findByIdAndUpdate(

            {_id: req.body.user},
            {todos: deletedTodo},
            {new: true}
        )
        console.log("🚀 ~ file: todoController.js:58 ~ module.exports.delete ~ updatedUser", updatedUser)


        res.send({success: true, updatedUser})

    } catch (error) {
        console.log("delete error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.complete = async (req, res) => {

    try {

        console.log("complete", req.body)
        const user = await User.findByIdAndUpdate(

            {
                _id: req.body.user,

            },
            {
                $set : {
                    'todos.$[elem].complete': true
                }
            },
            {
                arrayFilters: [{'elem._id': req.body._id}],
                new: true
            }
        )
	    res.json({success: true, user})

    } catch (error) {

        console.log("complete error", error.message)

        res.send({success: false, error: error.message})
    }
   
}

module.exports.uncomplete = async (req, res) => {

    try {

        console.log("uncomplete", req.body)
        const user = await User.findByIdAndUpdate(

            {
                _id: req.body.user,

            },
            {
                $set : {
                    'todos.$[elem].complete': false
                }
            },
            {
                arrayFilters: [{'elem._id': req.body._id}],
                new: true
            }
        )
	    res.json({success: true, user})

    } catch (error) {

        console.log("complete error", error.message)

        res.send({success: false, error: error.message})
    }
   
}