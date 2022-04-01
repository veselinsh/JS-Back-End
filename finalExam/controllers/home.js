const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getFirst3Created, getAllAds } = require('../services/ad');

const router = require('express').Router();

router.get('/',async(req,res)=>{
     const ads = await getFirst3Created();
     res.render('home',{title:'Home Page',ads});
});

router.get('/catalog',async(req,res)=>{
    const ads = await getAllAds();
    res.render('catalog',{title:'Catalog Page',ads})
})

router.get('/details/:id',preload(true),(req,res)=>{
    if (req.session.user) {
        res.locals.ad.hasUser = true;
        if (req.session.user?._id == res.locals.ad.author._id) {
            res.locals.ad.isOwner = true;
        }
        if(res.locals.ad.applied.some(b=>b._id == req.session.user._id)){
            res.locals.ad.alreadyVoted = true;
        }
    }
    res.render('details', { title: 'Details Page' })
});
router.get('/search',isUser(),(req,res)=>{
    res.render('search',{title:'Search Page'})
})

module.exports = router;