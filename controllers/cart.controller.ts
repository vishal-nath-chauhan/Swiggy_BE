import { STATUS, sendError, sendResponse, asyncHandler } from '../common/common.helper';
import { getUserFromHeader } from '../common/common.middleware';
// import Restaurants from '../models/restaurants.schema';
import Cart from '../models/cart.schema';




const createCart = asyncHandler(async (req: any, res: any, next: any) => {

    const user = await getUserFromHeader(req.headers,next)
    // const { restaurant, items, addons } = req.body;

    // if (!name || !mobile || !email || !address || !pan || !country_code) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', res);

    // const result = (await Cart.create({ name, mobile, country_code, email, address, pan })).toObject();
    // if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Create Restaurant', next)

    // return sendResponse(result, res);
});




const deleteRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const result = await Cart.findByIdAndDelete(id).lean();

    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Delete Restaurant', next)
    if (result) sendResponse(result, res);

});




const updateRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const dataToUpdate = req.body;

    const result = await Cart.findByIdAndUpdate(id, dataToUpdate, { new: true });

    if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to Update Restaurant", next)
    return sendResponse(result, res)
});


const getRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const restaurant = await Cart.findById(id).lean();

    if (!restaurant) return sendError(STATUS.NOT_FOUND, "No Restaurant Found", next)
    return sendResponse(restaurant, res);

});


const getAllRestaurants = asyncHandler(async (req: any, res: any, next: any) => {

    const restaurants = await Cart.find({}).lean();

    if (!restaurants) return sendError(STATUS.NOT_FOUND, "No Car Found", next)
    return sendResponse(restaurants, res)
});

const loginRestaurant = asyncHandler(async (req: any, res: any, next: any) => {


})


const index = {
    createCart,
    deleteRestaurant,
    updateRestaurant,
    getRestaurant,
    getAllRestaurants,
    loginRestaurant,
};
export default index;
