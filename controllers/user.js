import User from "../models/user.js";
import URL from "../models/url.js";

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const allURLs = await URL.find();
    await User.create({ name, email, password });
    return res.render("home", { urls: allURLs });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const allURLs = await URL.find();
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    return res.render("home", { urls: allURLs });
}

export { handleUserSignup, handleUserLogin };
