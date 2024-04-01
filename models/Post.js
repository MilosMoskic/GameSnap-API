const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please provide post title'],
        maxlength: 50
    },
    content:{
        type: String,
        required:[true, 'Please provide post content'],
        minlength: 5
    },
    picturePath: String,
    userPicturePath: String,
    category: {
        type: String,
        enum: ['Other', 'League of Legends', 'Dota 2', 'CS2', 'Minecraft'],
        default: 'Other',
        required:[true, 'Please provide post category']
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);