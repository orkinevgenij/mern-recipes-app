import { Router } from 'express'
import { registerUser, loginUser, getMe } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//Registration
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', checkAuth, getMe)

export default router
