const jwt = require('jsonwebtoken')
//statefull auth 

// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }


// stateless auth -jwt

const secret = process.env.JWT_SECRET
function setUser(user) {
    // console.log("scret", user, secret);
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}