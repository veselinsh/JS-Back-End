const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllTrips, getTripById } = require('../services/trip');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/trips', async (req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trips', trips })
});

router.get('/details/:id', preload(true), (req, res) => {
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        if (req.session.user?._id == res.locals.trip.owner._id) {
            res.locals.trip.isOwner = true;
        }
    }

    res.render('details', { title: 'Details Page' })
});

module.exports = router;