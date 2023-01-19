import { Schema, model, SchemaTypes, Document } from "mongoose";


export interface ICart extends Document {
	restaurant: Schema.Types.ObjectId;
	items: [{
		dish: Schema.Types.ObjectId, // dish id,
		qty: Schema.Types.Number,
		_id: Schema.Types.ObjectId,
		addOn: Schema.Types.ObjectId
	}];
	amount: number;
	_id: string;
	__v: any;
}

const CartSchema = new Schema<ICart>({

	restaurant: Schema.Types.ObjectId,
	items: [
		{
			dish: Schema.Types.ObjectId, // dish id,
			qty: Schema.Types.Number,
			addOn: Schema.Types.ObjectId,
		}
	],
	amount: Number
});

const Cart = model("cart", CartSchema);
export default Cart;
