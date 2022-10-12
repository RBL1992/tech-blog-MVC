const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll({include: [{model: User}, {model: Post}]});
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;