import express from 'express';
import mongoose from 'mongoose';
import urlRoutes from './routes/url.js';
import URL from './models/url.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/url', urlRoutes);

app.get('/', async (req, res) => {
    const allURLs = await URL.find();
    res.render('home', { urls: allURLs });  // use "urls" to match template
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
