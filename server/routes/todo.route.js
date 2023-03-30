const { Router } = require('express')
const { todoControllers } = require('../controllers/todo.controller')
const router = Router()

router.get('/todo/:userId', todoControllers.todoGet)
router.patch('/todo/add/:userId', todoControllers.todoCreate)
router.patch('/todo/update/:userId', todoControllers.todoToggleCompleted)
router.delete('/todo/delete/:userId', todoControllers.todoRemove)



module.exports = router 