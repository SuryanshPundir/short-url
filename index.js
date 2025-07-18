import express from 'express';
import mongoose from 'mongoose';
import urlRoutes from './routes/url.js';
import URL from './models/url.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://suryanshpundir16:1SsmiBmMLjX153vE@cluster0.f1hj4n4.mongodb.net/')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/url', urlRoutes);

// Redirect route
app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
        { shortID },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send('❌ URL not found');
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
