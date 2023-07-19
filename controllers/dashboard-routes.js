const express = require('express');
const router = express.Router();

const { User, Post, Comment } = require('../models');

// Middleware to check if the user is logged in //
const withAuth = require('../utils/auth');

// Dashboard route //
router.get('/', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

    res.render('dashboard', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create //
router.post('/create', withAuth, async (req, res) => {
  try {
    await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete //
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

// Check if the logged-in user is the owner of the post //
    if (post && post.user_id === req.session.user_id) {
      await post.destroy();
      res.status(200).end();
    } else {
      res.status(403).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
