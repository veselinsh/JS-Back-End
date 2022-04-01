const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register',{title:'Register Page'});
});

router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() == ''){

        }else if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t macth');
        }
        const user = await register(req.body.name,req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err);
        res.render('register', {title:'Register Page', data: {name:req.body.name, username: req.body.username }, errors });
    }

})

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err);
        res.render('login', { data: { username: req.body.username }, errors });
    }
})
router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
});

module.exports = router;