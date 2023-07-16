const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');

// Get all posts //
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'], include: { model: User, attributes: ['username'] } }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a post by ID //
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'post_id', 'createdAt'], include: { model: User, attributes: ['username'] } }
      ],
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a post //
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post by ID //
router.put('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await Post.update(req.body, {
      where: { id: postId },
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a post by ID //
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.destroy({
      where: { id: postId },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
