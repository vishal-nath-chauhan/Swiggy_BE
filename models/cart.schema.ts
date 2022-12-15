import { Schema, model, SchemaTypes } from "mongoose";

const CartSchema = new Schema({

	restaurant: SchemaTypes.ObjectId,
	items: [
		{
			id: SchemaTypes.ObjectId, // dish id,
			qty: SchemaTypes.Number,
		}
	],
	addons: [
		{
			id: SchemaTypes.ObjectId, //addon  id
			itemId: SchemaTypes.ObjectId // item ID
		}
	],
	user : SchemaTypes.ObjectId
});

const Cart = model("cart", CartSchema);
export default Cart;
