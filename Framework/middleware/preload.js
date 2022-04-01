//TODO replace with actula service
const collectionService = {};

function preload(){
    return async function(req,res,next){
        const id = req.params.id; 
        // TODO  property name to match collecction
        const data = await collectionService.getById(id);
        res.locals.data = data;
        next();
    }
}

module.exports = preload;