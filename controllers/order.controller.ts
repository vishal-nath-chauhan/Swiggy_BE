import { asyncHandler, generateTxnID, sendError, sendResponse, STATUS } from "../common/common.helper";
import { getUserFromHeader } from "../common/common.middleware";
import Orders from "../models/order.schema";
import initiateRazorpay, { createRazorpayOrder } from "../utils/Razorpay/razorpay.helpers";
import CartController from '../controllers/cart.controller'
import Cart from "../models/cart.schema";

const createOrder = asyncHandler(async (req: any, res: any, next: any) => {

    const user = await getUserFromHeader(req.headers, next)
    if (!user) return sendError(STATUS.NOT_AUTHORIZED, "Not Authorized!", next)

    const { restaurant, cart } = req.body

    if (!restaurant || !cart) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', next);

    const cartInDB = await Cart.findById(cart)
    if (!cartInDB) return sendError(STATUS.SERVER_ERROR, 'Cart Not Found', next);


    const razorPayInstance = await initiateRazorpay();
    const txn_id = generateTxnID()
    const options = {
        amount: cartInDB.amount,
        txn_id
    }
    const rPayOrder = createRazorpayOrder(options)

    // const result = await (await Cart.create({ restaurant, items, addons })).toObject();
    // if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to add cart", next)

    return sendResponse(result, res)
});