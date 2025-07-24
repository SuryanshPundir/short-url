import { getUser } from '../service/auth.js';

async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) {
        return res.redirect('/login');
    }

    const user = getUser(userUid);
    if (!user) {
        return res.redirect('/login');
    }
    req.user = user; // Attach user to request object
    next();
}
export default restrictToLoggedInUser;