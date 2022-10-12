const router = require('express').Router();
const { User, Post } = require('../../models');

// Get all Posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({include: [{model: User}]});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   find post by id
  router.get('/:id', async (req, res) => {
    try {
      const posts = await Post.findByPk(req.params.id, {
        include: [{ model: User }],
      });
  
      if (!posts) {
        res.status(404).json({ message: 'No posts found with that id!' });
        return;
      }
  
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Create a new Post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a Post by its id value
router.put('/:id', async (req, res) => {
    try{
      const insert = await Post.update(
        {
          title: req.body.title,
          body: req.body.body
        },
        {
          where: {
            id: req.params.id,
          }
        }
      )
        if (!insert) {
          res.status(404).json({ message: 'No Post found with that id!' });
          return;
        }
    
        res.status(200).json(insert);
      } catch (err) {
        res.status(500).json(err);
      }
  });
  
//   delete post by id
  router.delete('/:id', async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log('Post was deleted...')
      if (!deletePost) {
        res.status(404).json({ message: 'No Post found with that id!' });
        return;
      }
  
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;