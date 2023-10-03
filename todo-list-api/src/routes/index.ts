import { Router } from 'express'
import { router as authRoute } from './auth'
import { router as taskRoute } from './task'
import { verifyToken } from '../middleware/auth'

const router = Router()

router.use('/auth', authRoute)
router.use('/task', verifyToken, taskRoute)

export { router }