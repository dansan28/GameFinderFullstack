const Review = require('../models/Review')


const createReview = async (req, res, next) => {
  try {
    const { userId, rawgId, gameName, score, body } = req.body
    const review = await Review.create({ userId, rawgId, gameName, score, body })
    res.status(201).json({ success: true, data: review })
  } catch (error) {
    next(error)
  }
}


const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('userId', 'username')
    res.json({ success: true, count: reviews.length, data: reviews })
  } catch (error) {
    next(error)
  }
}


const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('userId', 'username')
    if (!review) return res.status(404).json({ success: false, message: 'Reseña no encontrada' })
    res.json({ success: true, data: review })
  } catch (error) {
    next(error)
  }
}


const getReviewsByGame = async (req, res, next) => {
  try {
    const reviews = await Review.find({ rawgId: req.params.rawgId }).populate('userId', 'username')
    res.json({ success: true, count: reviews.length, data: reviews })
  } catch (error) {
    next(error)
  }
}


const updateReview = async (req, res, next) => {
  try {
    const { score, body } = req.body
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { score, body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    if (!review) return res.status(404).json({ success: false, message: 'Reseña no encontrada' })
    res.json({ success: true, data: review })
  } catch (error) {
    next(error)
  }
}


const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(404).json({ success: false, message: 'Reseña no encontrada' })

    const requestingUserId = req.body.userId
    if (!requestingUserId || review.userId.toString() !== requestingUserId) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar esta reseña' })
    }

    await review.deleteOne()
    res.json({ success: true, message: 'Reseña eliminada correctamente' })
  } catch (error) {
    next(error)
  }
}

module.exports = { createReview, getReviews, getReviewById, getReviewsByGame, updateReview, deleteReview }
