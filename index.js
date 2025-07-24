import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import URL from './models/url.js';
import urlRoutes from './routes/url.js';
import userRoutes from './routes/user.js';
import { restrictToLoggedInUser, checkAuth } from './middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes

app.use('/url', restrictToLoggedInUser, urlRoutes);
app.use('/user', userRoutes);


app.get('/', checkAuth, async (req, res) => {
    if (!req.user) {
        return res.render('login');
    }

    const urls = req.user ? await URL.find({ createdBy: req.user._id }) : [];
    res.render('home', { urls });
});


app.get('/signup', (req, res) => {
    res.render('signup');  // Render registration page
});

app.get('/login', (req, res) => {
    res.render('login');
});
// Redirect route
app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        { shortID },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) return res.status(404).send('❌ URL not found');
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
