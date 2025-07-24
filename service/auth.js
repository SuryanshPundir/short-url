import User from '../models/user.js'; // Import your User model

async function getUser(id) {
    try {
        return await User.findById(id); // Fetch user from DB
    } catch {
        return null;
    }
}

function setUser() {
    // NOOP or deprecated – we won't use in-memory anymore
}

export { getUser, setUser }; // Keep `setUser` if legacy code uses it
