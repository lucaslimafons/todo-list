import { Router } from 'express'
import { create, destroy, findAll, findById, update } from '../resolvers/task'

// Routes for tasks
const router = Router()

router.post('/create', create)
router.put('/update/:id', update)
router.delete('/delete/:id', destroy)
router.get('/find/:id', findById)
router.get('/find-all', findAll)


export { router }
