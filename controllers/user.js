import User from "../models/user.js";
import URL from "../models/url.js";

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    const sessionId = user._id; // Use user._id as session ID
    res.cookie("uid", sessionId, { httpOnly: true });

    return res.render("home", { urls: [] }); // New user has no URLs yet
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    const sessionId = user._id; // You’re using _id as the uid
    res.cookie("uid", sessionId, { httpOnly: true });

    const allURLs = await URL.find({ createdBy: user._id }); // 🔧 Only fetch this user's URLs
    return res.render("home", { urls: allURLs });
}


export { handleUserSignup, handleUserLogin };
