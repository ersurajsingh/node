const {signup,login} = require('../controllers/AuthController');
const {signupValidation,loginValidation} = require('../middleware/AuthValidation');
const router = require('express').Router();
router.post('/sign-up',signupValidation,signup);
router.post('/login',loginValidation,login);

module.exports = router;