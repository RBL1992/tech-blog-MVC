const router = require("express").Router();
const {Post} = require("../models");
const withAuth = require('../utils/auth')

router.get("/", withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        const allPosts = posts.map((post) => post.get({plain: true}));
        res.render("all-posts-admin", {layout: "dashboard", allPosts});
    } catch(err) {
        res.status(400).json(err);
    }
});

// get route to render the new-post handlebars view with the dashboard layout
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {layout: 'dashboard'});
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const posted = await Post.findByPk(req.params.id);

        if(thePost) {
            const post = posted.get({plain: true});

            res.render('edit-post', {layout: 'dashboard', post});
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;