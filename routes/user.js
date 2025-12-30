const express = require('express');
const router = express.Router();
const { handleUserCreation, handleUserLogin, userLogout } = require('../controllers/user')

router.get('/login', (req, res) => {
    res.render('login');   // login.ejs
});
router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', handleUserCreation);
router.post('/login', handleUserLogin);
router.get('/logout', userLogout)
module.exports = router;
