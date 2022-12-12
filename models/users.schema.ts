import { Schema, model, SchemaTypes, Document, SchemaType, SchemaTypeOptions } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	avatar?: string;
	mobile: string;
	country_code: string;
	address: string;
	password: string;
	_id: string;
	__v: any;
}

const UserSchema = new Schema<IUser>({
	name: { type: String, required: true, maxLength: 80 },
	mobile: {
		type: String,
		required: true,
		minLength: 10,
		unique: true,
	},
	country_code: { type: String, required: true, minLength: 1 },
	email: {
		type: String,
		required: true,
		minLength: 3,
		unique: true,
	},
	address: {
		type: String,
		required: false,
		minLength: 10,
	},
	password: {
		type: String,
		required: true,
		length: 80

	}
});

const Users = model("user", UserSchema);
export default Users;
