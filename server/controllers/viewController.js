const Post = require('../models/postModel');
const catcher = require('../utils/catcher');
const ErrorThrower = require('../utils/ErrorThrower');

exports.overview = catcher(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).render('PostGallery', { title: 'All posts', posts });
});

exports.getPost = catcher(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new ErrorThrower('Post not found', 404));

  res.status(200).render('post', { title: 'Post', post });
});

exports.composePost = catcher(async (req, res, next) => {
  res.status(200).render('newpost', { title: 'New Post' });
});

exports.editPost = catcher(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new ErrorThrower('Post not found', 404));

  res.status(200).render('newpost', { title: 'Edit Post', post });
});
