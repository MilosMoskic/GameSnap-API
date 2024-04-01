const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllUserPosts = async (req, res) => {
    const posts = await Post.find({createdBy:req.user.userId});
    res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

const getFeedPosts = async( req, res) => {
    const posts = await Post.find({});
    res.status(StatusCodes.OK).json({ posts, count: posts.length });
}

const getPost = async (req, res) => {
    const {
        user:{userId},
        params:{id:postId}
    } = req;

    const post = await Post.findOne({
        _id: postId, createdBy:userId
    });
    if(!post){
        throw new NotFoundError(`No post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const post = await Post.create(req.body);
    res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
    const {
        body: { title, content, category },
        user: { userId },
        params: { id: postId },
    } = req;

    if(title === '' || content=== '' || category === ''){
        throw new BadRequestError('Title, Content or Category fields cannot be empty')
    }

    const post = await Post.findByIdAndUpdate(
        { _id: postId, createdBy: userId },
        req.body,
        { new: true, runValidators: true}
    );

    if(!post){
        throw new NotFoundError(`No post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
    const {
        user:{userId},
        params:{id:postId}
    } = req;

    const post = await Post.findOneAndDelete({
        _id: postId,
        createdBy: userId
    });

    if(!post){
        throw new NotFoundError(`No post with id ${postId}`);
    }
    res.status(StatusCodes.OK).send();
};

// option for liking the post 

// const likePost = async(req, res) =>{
//     const {
//         user: {userId},
//         params:{id:postId}
//     } = req;
//     const post = await Post.findById(id);
    
//     if(!post){
//         throw new NotFoundError(`No post with id ${postId}`);
//     }

//     const isLiked = post.likes.get(userId);

//     if(isLiked){
//         post.likes.delete(userId);
//     }else{
//         post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//         id,
//         { likes: post.likes },
//         { new: true }
//     );
//     res.status(StatusCodes.OK).json({ updatedPost });
// }

module.exports = {
    getAllUserPosts,
    getFeedPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
};

// Klip od 10h
// 8:13:00

// Klip od 5h
// 1:14:00