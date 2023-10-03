import { Router } from 'express'
import { signUp, signIn } from '../resolvers/auth'

const router = Router()

// Routes for authentication
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)


export { router }
