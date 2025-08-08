const jwt = require("jsonwebtoken");
const secret = "Shekhar_#@123!";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};