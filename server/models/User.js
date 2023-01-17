const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [
        {text: {
            type: String,
            required: true
        },
	    complete: {
            type: Boolean,
            default: false
        }
	}]
}, {timeStamps: true});

const Todo = mongoose.model("User", userSchema);

module.exports = Todo;