const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')
const todoController = require('../controllers/todoController')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/list', userController.list)

router.get('/todo/list', todoController.list)
router.post('/todo/add', todoController.add)
router.delete('/todo/delete', todoController.delete)
router.post('/todo/complete', todoController.complete)
router.post('/todo/uncomplete', todoController.uncomplete)



module.exports = router