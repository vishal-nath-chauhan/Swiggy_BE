import { Schema, model, SchemaTypes } from "mongoose";

const DishSchema = new Schema({
	code: { type: String, required: true, maxLength: 10,unique:true, },
	name: { type: String, required: true, maxLength: 100 },
	cost_price: {
		type: Number,
		required: true,
		min: 1,
	},
	sell_price: {
		type: Number,
		required: true,
		min: 1,
	},
	type: {
		type: String,
		enum: ["VEG", "NONVEG", "BOTH"],
		default: "VEG",
	},
	cuisine: String,
	image: String,
	units:[{
		qty:Number,
		unit: ["UNIT", "KG", "HALF", "FULL"],
		price:Number,
	}],
	// preparation time ,minimum 5 minutes
	prep_time: {
		type: Number,
		min: 5,
	},
});

const Dishes = model("dish", DishSchema);
export default Dishes;
