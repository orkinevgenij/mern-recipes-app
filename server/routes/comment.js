import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import {
  createComment,
  getOneComment,
  removeComment,
  updateComment,
} from '../controllers/comments.js'

const router = new Router()

router.post('/:id', checkAuth, createComment)
router.get('/:id', getOneComment)
router.patch('/:id', checkAuth, updateComment)
router.delete('/:id', checkAuth, removeComment)

export default router
