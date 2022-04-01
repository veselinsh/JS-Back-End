const { isUser } = require('../middleware/guards');
const { createHouse, getHouseById, updateHouse } = require('../services/houses');
const { mapErrors, houseViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
  res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
  const userId = req.session.user._id;
  const house = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    image: req.body.image,
    description: req.body.description,
    pieces: req.body.pieces,
    owner: userId
  }

  try {
    await createHouse(house);
    res.redirect('/catalog')
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render('create', { title: 'Create Page', errors, data: house });
  }
});

router.get('/details/:id', async (req, res) => {
  const id = req.params.id;
  const house = houseViewModel(await getHouseById(id));
  house.rentedCount = house.rented.length;
  if (req.session.user) {
    house.hasUser = true;
    if (req.session.user._id == house.owner._id) {
      house.isAuthor = true;
    } else {
      house.hasRented = house.rented.includes(req.session.user._id)
      console.log(house.hasRented);
    }
  }
  res.render('details', { title: 'Details Page', house });
});

router.get('/edit/:id',isUser(),async(req,res)=>{
  const id = req.params.id;
  const house = houseViewModel(await getHouseById(id));
  if (req.session.user._id != house.owner._id) {
      return res.redirect('/login')
  }
  res.render('edit', { title: 'Edit', house })
});

router.post('/edit/:id',isUser(),async(req,res)=>{
  const id = req.params.id;
  const existing = houseViewModel(await getHouseById(id));
  if (req.session.user._id != existing.owner._id) {
      return res.redirect('/login')
  }
  const house = {
      name: req.body.name,
      type: req.body.type,
      year: req.body.year,
      city: req.body.city,
      image: req.body.image,
      description: req.body.description,
      pieces: req.body.pieces,
  };

  try {
      await updateHouse(id, house);
      res.redirect('/details/' + id)
  } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      res.render('edit', { title: 'Edit Page', errors, house });
  }
})

// router.post('/rent/:id',async(req,res)=>{
//    const id = req.params.id;
//    const house = houseViewModel(await getHouseById(id));

//    house.rented.push(id);
//    house.pieces -= 1;
//    await house.save();
//   res.render('details', { title: 'Details Page', house });
// });

module.exports = router;

