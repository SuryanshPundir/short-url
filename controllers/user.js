import User from "../models/user.js";
import URL from "../models/url.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

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

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId, { httpOnly: true });
    return res.render("home", { urls: allURLs });
}

export { handleUserSignup, handleUserLogin };
