const House = require('../models/House');

async function getHouses(){
    const houses = await House.find({});
    return houses;
}
async function getHouseById(id){
    const house = await House.findById(id);
    return house;
}

async function createHouse(house){
    const result = new House(house);
    await result.save();
    return result
}
async function updateHouse(id,house){
    const existing = await House.findById(id);
    existing.name = house.title;
    existing.type = house.keyword;
    existing.year = house.location;
    existing.city = house.date;
    existing.image = house.image;
    existing.description = house.description;
    existing.pieces = house.pieces;
    await existing.save();
}
module.exports = {
    getHouses,
    getHouseById,
    createHouse,
    updateHouse,
}