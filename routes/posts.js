const express = require('express');
const router = express.Router();

const {
    getPost,
    createPost,
    updatePost,
    deletePost,
    getFeedPosts
} = require('../controllers/posts.js');

router.route('/').post(createPost).get(getFeedPosts);
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;