const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El userId es obligatorio']
  },
  rawgId: {
    type: Number,
    required: [true, 'El rawgId del juego es obligatorio']
  },
  gameName: {
    type: String,
    required: [true, 'El nombre del juego es obligatorio'],
    trim: true
  },
  score: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: [1, 'La puntuación mínima es 1'],
    max: [10, 'La puntuación máxima es 10']
  },
  body: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio'],
    trim: true,
    minlength: [10, 'La reseña debe tener al menos 10 caracteres'],
    maxlength: [1000, 'La reseña no puede superar 1000 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

reviewSchema.index({ rawgId: 1 })

module.exports = mongoose.model('Review', reviewSchema)
