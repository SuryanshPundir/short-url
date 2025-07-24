import { getUser } from '../service/auth.js';

async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) return res.redirect('/login');

    const user = await getUser(userUid);
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
