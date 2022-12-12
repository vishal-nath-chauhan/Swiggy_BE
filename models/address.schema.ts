import { Schema, model, SchemaTypes } from 'mongoose';

const AddressSchema = new Schema({
    address: { type: String, required: true, maxLength: 180 },
    // lattitude and longitude
    lat: String,
    lon: String,
    flat_no: {
        type: String,
        required: true,
        minLength: 3,
    },
    landmark: {
        type: String,
        required: true,
        minLength: 3,
    },
    area: {
        type: String,
        required: true,
        minLength: 3,
    },
    city: {
        type: String,
        required: true,
        minLength: 3,
    },
    annotation: {
        type: Array,
        required: true,
        enum: ['HOME', 'OFFICE'],
    },
});

const Address = model('address', AddressSchema);
export default Address;
