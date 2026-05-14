const express = require('express')
const router = express.Router()
const validateObjectId = require('../middlewares/validateObjectId')
const { createReview, getReviews, getReviewById, getReviewsByGame, updateReview, deleteReview } = require('../controllers/reviewController')

router.post('/', createReview)
router.get('/', getReviews)
// Ruta estática antes que la dinámica para evitar conflictos
router.get('/game/:rawgId', getReviewsByGame)
router.get('/:id', validateObjectId, getReviewById)
router.put('/:id', validateObjectId, updateReview)
router.delete('/:id', validateObjectId, deleteReview)

module.exports = router
