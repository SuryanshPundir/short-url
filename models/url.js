import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: { type: Number }
    }]
});

export default mongoose.model('URL', urlSchema);
