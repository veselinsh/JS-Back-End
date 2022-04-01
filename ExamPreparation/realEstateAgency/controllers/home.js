const { getHouses } = require('../services/houses');
const { houseViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/',async (req,res)=>{
    
   res.render('home',{title:'Home Page'})
});
router.get('/catalog',async(req,res)=>{
   const houses = (await getHouses()).map(houseViewModel);
   res.render('catalog',{title:'Housing for rent',houses});
})

module.exports = router;