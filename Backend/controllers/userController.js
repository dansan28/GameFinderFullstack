const bcrypt = require('bcryptjs')
const User = require('../models/User')


const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ username, email, password: hashedPassword })
    const { password: _, ...userSafe } = user.toObject()
    res.status(201).json({ success: true, data: userSafe })
  } catch (error) {
    next(error)
  }
}


const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.json({ success: true, count: users.length, data: users })
  } catch (error) {
    next(error)
  }
}


const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}


const updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}


const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
    res.json({ success: true, message: 'Usuario eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email y contraseña requeridos' })
    const user = await User.findOne({ email })
    if (!user)
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
    const { password: _, ...userSafe } = user.toObject()
    res.json({ success: true, data: userSafe })
  } catch (error) {
    next(error)
  }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser }
