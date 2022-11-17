import { STATUS, sendError, sendResponse, asyncHandler } from '../common/common.helper';
import Restaurants from '../models/restaurants.schema';


const addRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { name, mobile, country_code, email, address, pan } = req.body;

    if (!name || !mobile || !email || !address || !pan || !country_code) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', res);

    const isRestaurantExists = await Restaurants.findOne({ pan }).lean();
    if (isRestaurantExists) return sendError(STATUS.BAD_REQUEST, 'Restaurant with same details exists.', next)

    const result = (await Restaurants.create({ name, mobile, country_code, email, address, pan })).toObject();
    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Add Restaurant', next)

    return sendResponse(result, res);
});




const deleteRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const result = await Restaurants.findByIdAndDelete(id).lean();

    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Delete Restaurant', next)
    if (result) sendResponse(result, res);

});




const updateRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const dataToUpdate = req.body;

    const result = await Restaurants.findByIdAndUpdate(id, dataToUpdate, { new: true });

    if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to Update Restaurant", next)
    return sendResponse(result, res)
});


const getRestaurant = asyncHandler(async (req: any, res: any, next: any) => {
    const { id } = req.query;
    const restaurant = await Restaurants.findById(id).lean();

    if (!restaurant) return sendError(STATUS.NOT_FOUND, "No Restaurant Found", next)
    return sendResponse(restaurant, res);

});


const getAllRestaurants = asyncHandler(async (req: any, res: any, next: any) => {

    const restaurants = await Restaurants.find({}).lean();

    if (!restaurants) return sendError(STATUS.NOT_FOUND, "No Restaurants Found", next)
    return sendResponse(restaurants, res)
});

const loginRestaurant = asyncHandler(async (req: any, res: any, next: any) => {


})


const index = {
    addRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getRestaurant,
    getAllRestaurants,
    loginRestaurant,
};
export default index;
