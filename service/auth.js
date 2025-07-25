import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Create a JWT from a user object (usually _id or essential info only)
// service/auth.js
function setUser(user) {
    // Ensure user is a plain object like { _id: "...", email: "...", etc. }
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


// Extract user from token
function getUser(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error('❌ Invalid token:', err.message);
        return null;
    }
}

export { getUser, setUser };
