const router = require('express').Router()
const {checkUSer} = require('../middlewares/authMiddleware')
const controller = require('../controllers/userController')

router.post('/' , checkUSer)
router.post('/application' , controller.application)
router.get('/getStatus/:id', controller.getStatus )
module.exports = router