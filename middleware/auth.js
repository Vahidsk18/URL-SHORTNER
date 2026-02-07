const { getUser } = require('../service/auth');

//global middleware
async function checkForAuthentication(req, res, next) {
    try {
        const userUid = req.cookies?.uid

        if (!userUid) {
            req.loggedInUser = null
            return next()
        }

        const user = getUser(userUid) // may throw
        req.loggedInUser = user || null
        return next()
    } catch (err) {
        console.error('Auth middleware error:', err.message)
        req.loggedInUser = null
        return next()
    }
}


function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.loggedInUser) return res.redirect('/login')

        if (!roles.includes(req.loggedInUser.role)) return res.end('UnAuthorized...');

        return next();
    }
}

function noCache(req, res, next) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
}


module.exports = {
    checkForAuthentication,
    restrictTo,
    noCache,
};