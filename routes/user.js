const express = require('express');
const router = express.Router();
const { handleUserCreation, handleUserLogin, userLogout } = require('../controllers/user')

// router.get('/login', (req, res) => {
//     res.render('login');   // login.ejs
// });

router.post('/', handleUserCreation);
router.post('/login', handleUserLogin);
router.get('/logout', userLogout)
module.exports = router;
