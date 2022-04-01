function mapErrors(err){
    if(Array.isArray(err)){
        return err;
    }else if(err.name == 'ValidationError'){
        return Object.values(err.errors).map(e=>({msg:e.message}));
    }else if(typeof err.message == 'string'){
        return [{msg :err.message}];
    }else{
        return [{msg :'Request error'}];
    }

}

function houseViewModel(house){
    return {
        _id: house._id,
        name: house.name,
        type: house.type,
        city: house.city,
        image: house.image,
        description: house.description,
        pieces: house.pieces,
        rented: house.rented,
        owner: ownerViewModel(house.owner),
    }
}
function ownerViewModel(user){
    return {
        _id: user._id,
    }
 }


module.exports = {
    houseViewModel,
    mapErrors,
}