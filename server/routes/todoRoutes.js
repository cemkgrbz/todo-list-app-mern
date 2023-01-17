const express = require('express')

const router = express.Router()

const todoController = require('../controllers/todoController')

router.get('/list', todoController.list)
router.post('/add', todoController.add)
router.delete('/delete/:id', todoController.delete)
router.get('/complete/:id', todoController.complete)

module.exports = router