const {Schema,model} = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    price: {
        type: Number,
        default: 0,
        min:[0,'Price cannot be nagative!']
    },
});

carSchema.methods.startEngine = function () {
    console.log(`${this.name} goes Vroom!`);
}
carSchema.virtual('VAT').get(function () {
    return this.price * 0.2;
})
const Car = model('Car', carSchema)

module.exports = Car;