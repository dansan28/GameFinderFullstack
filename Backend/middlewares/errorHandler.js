const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'ID inválido' })
  }

 
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(', ')
    return res.status(400).json({ success: false, message })
  }

  
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Ya existe un registro con esos datos' })
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  })
}

module.exports = errorHandler
