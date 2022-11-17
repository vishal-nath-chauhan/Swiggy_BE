import { Schema, model, SchemaTypes } from 'mongoose';

const RestaurantSchema = new Schema({
    name: { type: String, required: true, maxLength: 80 },
    country_code: { type: String, required: true, minLength: 1 },
    mobile: { type: String, required: true, minLength: 10,maxLength:10 },
    email: { type: String, required: true, minLength: 3 },
    address: { type: String, required: true, minLength: 10,maxLength:350 },
    pan: { type: String, require: true, minLength: 10, maxLength: 10 },
});

const Restaurants = model('restaurant', RestaurantSchema);
export default Restaurants;
