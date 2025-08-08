const express = require("express");
const URL = require("./models/url");
const path = require("path");

const cookieParser = require("cookie-parser");

const {connectToMongoDB} = require("./connect");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const {checkForAuthentication,restrictTo,} = require("./middlewares/auth");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/URL-Shortner").then( () =>
    console.log("MongoDB Conncted !")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls : allUrls,
    });
});



app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use(express.static("public"));
app.use(express.json()); // for JSON body parsing

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);//restrictToLoggedinUserOnly will only run if we request in "/url" middleware
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: { visitHistory: { timestamp: new Date() } }
        },
        { new: true } // ✅ return the updated document
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));