const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createAd, updateAd, deleteAd, getAdById, appliedForJob } = require('../services/ad');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Job Offer', data: {} })
});

router.post('/create', isUser(), async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        description: req.body.description,
        author: req.session.user._id,
    }
    try {
        await createAd(ad);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Job Offer', data: ad, errors });
    }
});

router.get('/edit/:id', preload(), isUser(), (req, res) => {
    res.render('edit', { title: 'Edit Offer' })
});
router.post('/edit/:id', preload(), isUser(), async (req, res) => {
    const id = req.params.id;
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        description: req.body.description,
    };

    try {
        await updateAd(id, ad);
        res.redirect('/details/' + id)
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err);
        ad._id = id;
        res.render('edit', { title: 'Edit Job Offer', ad, errors });
    }
});
router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteAd(req.params.id);
    res.redirect('/catalog');
});

router.get('/applied/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await appliedForJob(id,req.session.user._id)
    } catch (err) {
        console.error(err)
    }finally{
        res.redirect('/details/' + id)
    }


})


module.exports = router;