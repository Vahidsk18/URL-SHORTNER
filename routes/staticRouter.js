const express = require('express')
const URL = require('../models/url')
const router = express.Router()
const { restrictTo } = require('../middleware/auth')


// router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
//     let allurls = await URL.find({});
//     if (!allurls) return res.send("No users Yet")
//     return res.render('url', { urls: allurls })
// })


router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {

    let allurls;
    if (req.loggedInUser.role === "ADMIN") {
        // ADMIN: see all URLs + creator details
        allurls = await URL.find({})
            .populate("createdBy", "name email");

        return res.render("admin", {
            user: req.loggedInUser,
            urls: allurls,
            baseUrl: process.env.BASE_URL || `${req.protocol}://${req.get("host")}`,
        });
    } else {
        allurls = await URL.find({ createdBy: req.loggedInUser._id });
    }
    if (!req.loggedInUser) return res.redirect('login');

    return res.render('url', {
        urls: allurls,
        user: req.loggedInUser,
        baseUrl: process.env.BASE_URL || `${req.protocol}://${req.get("host")}`,
    })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router