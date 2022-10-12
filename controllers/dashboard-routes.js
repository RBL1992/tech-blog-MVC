const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({ include: [User] });

        const posts = allPosts.map(post => {
            post.get({ plain: true });
        });
        res.render('all-posts', { posts });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;