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

router.get('/post/:id', async (req, res) => {
    try {
        const aPost = await Post.findByPk(req.params.id, {
            include: [User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if(aPost) {
            const post = aPost.get({plain: true});
            res.render('single-post', {post});
        }
    } catch(err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;