const User = require('../models/user')
const { setUser } = require('../service/auth')

async function handleUserCreation(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,

    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const result = await User.findOne({ email, password })

    if (!result) return res.render('login', {
        error: "Invalid Username or Password"
    });

    const token = setUser(result)
    // console.log("ttt",token);
    res.cookie("uid", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })
    return res.redirect('/')
}

function userLogout(req, res) {
    res.clearCookie('uid')
    return res.redirect('/login')
}

module.exports = {
    handleUserCreation,
    handleUserLogin,
    userLogout,

}