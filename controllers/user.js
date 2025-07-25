import User from "../models/user.js";
import URL from "../models/url.js";
import { setUser } from "../service/auth.js";

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    const newUser = await User.create({ name, email, password });

    const token = setUser({ _id: newUser._id }); // ✅ Create JWT
    res.cookie('uid', token, { httpOnly: true }); // ✅ Set cookie

    res.redirect('/'); // ✅ Go to home, now logged in
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    const token = setUser(user); // Set user in session
    res.cookie("uid", token, { httpOnly: true });

    const allURLs = await URL.find({ createdBy: user._id }); // 🔧 Only fetch this user's URLs
    return res.render("home", { urls: allURLs });
}


export { handleUserSignup, handleUserLogin };
