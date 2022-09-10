const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const favoriteSchema = Schema({
    userFrom: {
        type: Schema.types.ObjectId,
        ref: 'User'
    },

    movieId: {
        type: String
    },

    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true });



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
