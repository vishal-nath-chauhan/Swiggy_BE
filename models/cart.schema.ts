import { Schema, model, SchemaTypes } from "mongoose";

const CartSchema = new Schema({

	restaurant: SchemaTypes.ObjectId,
	items: [
		{
			dish: SchemaTypes.ObjectId, // dish id,
			qty: SchemaTypes.Number,
		}
	],
	addons: [
		{
			dish: SchemaTypes.ObjectId, //addon  id
			itemId: SchemaTypes.ObjectId // item ID
		}
	],
});

const Cart = model("cart", CartSchema);
export default Cart;
