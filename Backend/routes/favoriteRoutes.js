const express = require('express')
const router = express.Router()
const validateObjectId = require('../middlewares/validateObjectId')
const { createFavorite, getFavorites, getFavoriteById, getFavoritesByUser, updateFavorite, deleteFavorite } = require('../controllers/favoriteController')

router.post('/', createFavorite)
router.get('/', getFavorites)
// Ruta estática antes que la dinámica para evitar conflictos
router.get('/user/:userId', getFavoritesByUser)
router.get('/:id', validateObjectId, getFavoriteById)
router.put('/:id', validateObjectId, updateFavorite)
router.delete('/:id', validateObjectId, deleteFavorite)

module.exports = router
