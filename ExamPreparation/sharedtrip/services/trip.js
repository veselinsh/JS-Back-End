const Trip = require('../models/Trip');

async function getAllTrips(){
    return await Trip.find({}).lean();
}
async function getTripById(id){
    return await Trip.findById(id).lean()
}
async function getTripAndUsers(id){
    return await Trip.findById(id).populate('owner').populate('buddies').lean()
}
async function createTrip(trip){
    const result = new Trip(trip);
    await result.save();
    return result;
}
async function updateTrip(id,trip){
     const existing = await Trip.findById(id);
     existing.start = trip.start;
     existing.end = trip.end;
     existing.date = trip.date;
     existing.time = trip.time;
     existing.carImg = trip.carImg;
     existing.carBrand = trip.carBrand;
     existing.seats = trip.seats;
     existing.price = trip.price;
     existing.description = trip.description;

     await existing.save();
}

async function deleteTrip(id){
    await Trip.findByIdAndDelete(id);
}

module.exports = {
    getAllTrips,
    getTripById,
    getTripAndUsers,
    createTrip,
    updateTrip,
    deleteTrip
};