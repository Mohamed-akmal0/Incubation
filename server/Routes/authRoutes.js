const router = require('express').Router()
const controller = require('../controllers/AuthControllers')
const {checkUSer} = require('../middlewares/authMiddleware')
//base route 
router.get('/' , checkUSer)
router.post('/signup' , controller.signup)
router.post('/login', controller.login)

module.exports = router