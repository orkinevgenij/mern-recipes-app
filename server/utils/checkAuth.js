import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      req.userId = decoded._id
      console.log(req.userId)
      next()
    } catch (error) {
      return res.status(403).json({
        message: 'Нет доступа',
      })
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    })
  }
}
