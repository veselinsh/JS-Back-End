//TODO replace with actula service
const collectionService = require('../services/ad');

function preload(){
    return async function(req,res,next){
        const id = req.params.id; 
        const ad = await collectionService.getAdById(id);
        res.locals.ad = ad;
        next();
    }
}

module.exports = preload;