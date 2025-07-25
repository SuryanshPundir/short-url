import { getUser } from '../service/auth.js';



function restrictToLoggedInUser(req, res, next) {
    const token = req.cookies.uid;
    if (!token) return res.redirect('/login');

    const user = getUser(token); // ✅ Pass token, not just id
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}


async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) {
        req.user = null;
        return next();
    }

    const user = await getUser(userUid);
    req.user = user || null;
    next();
}

export { restrictToLoggedInUser, checkAuth };
