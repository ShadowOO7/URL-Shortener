const {setUser, getUser} = require("../service/auth");

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookie?.token;
    req.user = null;
    if(!tokenCookie ) return next();
        
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

//ADMIN, NORMAL
function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        next();
    };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;
//     if (!userUid) {
//         return res.redirect("/login");
//     }

//     const user = getUser(userUid);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user; // Attach user to request object
//     next();
// }

// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);

//     req.user = user;
//     next();
// }

module.exports = {
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
};