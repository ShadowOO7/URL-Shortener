const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required!" });
        }

        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
            createdBy: req.user ? req.user._id : null, // Only if logged in
        });

        // Render the home page with the new short ID
        return res.render("home", { id: shortID });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found!" });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};