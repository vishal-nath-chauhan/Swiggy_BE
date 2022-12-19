import { STATUS, sendError, sendResponse, asyncHandler } from '../common/common.helper';
import { getUserFromHeader } from '../common/common.middleware';
import Cart from '../models/cart.schema';




const createCart = asyncHandler(async (req: any, res: any, next: any) => {

    const user = await getUserFromHeader(req.headers, next)
    if (!user) return sendError(STATUS.NOT_AUTHORIZED, "Not Authorized!", next)

    const { restaurant, items, addons } = req.body

    if (!restaurant || !items) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', next);

    const result = await (await Cart.create({ restaurant, items, addons })).toObject();
    if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to add cart", next)

    return sendResponse(result, res)
});




const deleteCart = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const result = await Cart.findByIdAndDelete(id).lean();

    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Delete Cart', next)
    if (result) sendResponse(result, res);

});




const updateCart = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const dataToUpdate = req.body;
    const {items,addons}=dataToUpdate
    if(!items) sendError(STATUS.BAD_REQUEST,"Please send all required fields ",next)

    const cart = await Cart.findById(id);
    if(!cart) return sendError(STATUS.BAD_REQUEST,'Cart not Found',next)
    const oldItems = cart.items;
    const newItems = [...oldItems,...items]
    const resp = await Cart.findByIdAndUpdate(id,{items:newItems})
console.log({resp});

    // const cart = await Cart.findById(id).lean();
    // if (!cart) return sendError(STATUS.BAD_REQUEST, 'No Cart Found!',next)
    // const oldItems = cart.items;
    // const newItems = [...oldItems,...items]
    // console.log("CART ", cart,newItems);


    // const result = await Cart.findByIdAndUpdate(id, dataToUpdate, { new: true });

    // if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to Update Cart", next)
    return sendResponse(resp, res)
});


const getCart = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const restaurant = await Cart.findById(id).lean();

    if (!restaurant) return sendError(STATUS.NOT_FOUND, "No Restaurant Found", next)
    return sendResponse(restaurant, res);

});


// const getAllRestaurants = asyncHandler(async (req: any, res: any, next: any) => {

//     const restaurants = await Cart.find({}).lean();

//     if (!restaurants) return sendError(STATUS.NOT_FOUND, "No Car Found", next)
//     return sendResponse(restaurants, res)
// });



const index = {
    createCart,
    deleteCart,
    updateCart,
    getCart
};
export default index;
