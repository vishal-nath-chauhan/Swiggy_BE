import { Schema, model, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
	name: { type: String, required: true, maxLength: 80 },
	mobile: {
		type: String,
		required: true,
		minLength: 10,
		unique:true,
	},
    country_code: { type: String, required: true, minLength: 1 },
	email: {
		type: String,
		required: true,
		minLength: 3,
		unique:true,
	},
	address: {
		type: Array,
		required: true,
		minLength: 10,
	},
});

const Users = model("user", UserSchema);
export default Users;
