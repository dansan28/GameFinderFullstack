const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El userId es obligatorio']
  },
  rawgId: {
    type: Number,
    required: [true, 'El rawgId del juego es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre del juego es obligatorio'],
    trim: true
  },
  background_image: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  released: {
    type: String,
    default: null
  },
  genres: {
    type: [String],
    default: []
  },
  savedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: '',
    maxlength: [500, 'La nota no puede superar 500 caracteres'],
    trim: true
  }
})

// Un usuario no puede guardar el mismo juego dos veces
favoriteSchema.index({ userId: 1, rawgId: 1 }, { unique: true })

module.exports = mongoose.model('Favorite', favoriteSchema)
