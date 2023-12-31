const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create //
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update by ID //
router.put('/:id', withAuth, async (req, res) => {
    try {
      const commentId = req.params.id;
  
      const updatedComment = await Comment.update(req.body, {
        where: { id: commentId },
      });
  
      if (!updatedComment[0]) {
        res.status(404).json({ message: 'No comment found with this id.' });
        return;
      }
  
      res.status(200).json(updatedComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Delete by ID //
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentId = req.params.id;

    const deletedComment = await Comment.destroy({
      where: { id: commentId },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id.' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
