const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth"); // ✅ Import the middleware

const router = express.Router();

// Admin only route
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { urls: allUrls });
});

// Normal or Admin route
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { urls: allUrls });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;