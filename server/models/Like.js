const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    

}, { timestamps: true });