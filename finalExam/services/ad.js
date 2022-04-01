const res = require('express/lib/response');
const Ad = require('../models/Ad')

async function getAllAds(){
    return await Ad.find({}).lean();
}

async function getFirst3Created(){
    return await Ad.find({}).sort('1').limit(3).lean();
}

async function getAdById(id){
    return await Ad.findById(id).populate('author').populate('applied').lean();
}

async function createAd(ad){
    const result = new Ad(ad);
    await result.save();
    return result;
}
async function updateAd(id,ad){
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.description = ad.description;
    await existing.save();
}
async function deleteAd(id){
    await Ad.findByIdAndDelete(id);
}

async function appliedForJob(tripId,userId){
   const ad = await Ad.findById(tripId)
   if(!ad.applied.includes(userId)){
       ad.applied.push(userId);
    }
   await ad.save();
}
module.exports = {
    getAllAds,
    getAdById,
    getFirst3Created,
    createAd,
    updateAd,
    deleteAd,
    appliedForJob
}