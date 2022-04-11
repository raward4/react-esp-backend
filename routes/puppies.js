import { Router } from 'express'
import * as puppiesCtrl from '../controllers/puppies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()



/*---------- Public Routes ----------*/
router.get('/:id', puppiesCtrl.show)
router.get('/', puppiesCtrl.index)



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, puppiesCtrl.create)
router.put('/:id', checkAuth, puppiesCtrl.update)
router.delete('/:id', checkAuth, puppiesCtrl.delete)



export {
  router
}
