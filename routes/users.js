const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/users.js');
const { getAllUserPosts } =require('../controllers/posts.js');

// router.route('/:id').get(getUser);
router.route('/post/:id').get(getAllUserPosts);

module.exports = router;