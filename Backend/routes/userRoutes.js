const express = require('express')
const router = express.Router()
const validateObjectId = require('../middlewares/validateObjectId')
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', validateObjectId, getUserById)
router.put('/:id', validateObjectId, updateUser)
router.delete('/:id', validateObjectId, deleteUser)

module.exports = router
