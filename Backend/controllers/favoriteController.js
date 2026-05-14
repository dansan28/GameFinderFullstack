const Favorite = require('../models/Favorite')


const createFavorite = async (req, res, next) => {
  try {
    const { userId, rawgId, name, background_image, rating, released, genres } = req.body
    const favorite = await Favorite.create({ userId, rawgId, name, background_image, rating, released, genres })
    res.status(201).json({ success: true, data: favorite })
  } catch (error) {
    next(error)
  }
}


const getFavorites = async (req, res, next) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {}
    const favorites = await Favorite.find(filter).populate('userId', 'username email')
    res.json({ success: true, count: favorites.length, data: favorites })
  } catch (error) {
    next(error)
  }
}


const getFavoriteById = async (req, res, next) => {
  try {
    const favorite = await Favorite.findById(req.params.id).populate('userId', 'username email')
    if (!favorite) return res.status(404).json({ success: false, message: 'Favorito no encontrado' })
    res.json({ success: true, data: favorite })
  } catch (error) {
    next(error)
  }
}


const getFavoritesByUser = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId })
    res.json({ success: true, count: favorites.length, data: favorites })
  } catch (error) {
    next(error)
  }
}


const updateFavorite = async (req, res, next) => {
  try {
    const { notes } = req.body
    const favorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      { notes },
      { new: true, runValidators: true }
    )
    if (!favorite) return res.status(404).json({ success: false, message: 'Favorito no encontrado' })
    res.json({ success: true, data: favorite })
  } catch (error) {
    next(error)
  }
}

const deleteFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findById(req.params.id)
    if (!favorite) return res.status(404).json({ success: false, message: 'Favorito no encontrado' })

    const requestingUserId = req.body.userId
    if (!requestingUserId || favorite.userId.toString() !== requestingUserId) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar este favorito' })
    }

    await favorite.deleteOne()
    res.json({ success: true, message: 'Favorito eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}

module.exports = { createFavorite, getFavorites, getFavoriteById, getFavoritesByUser, updateFavorite, deleteFavorite }
