const { getUser } = require('../service/auth');

//global middleware
async function checkForAuthentication(req, res, next) {
    const userUid = req.cookies.uid;
    // console.log("cookie", userUid)

    if (!userUid) {
        req.loggedInUser = null;
        return next();
    }

    const user = getUser(userUid);
    // console.log("getuser", user)
    req.loggedInUser = user || null
    return next();
}


function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.loggedInUser) return res.redirect('/login')

        if (!roles.includes(req.loggedInUser.role)) return res.end('UnAuthorized...');

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};