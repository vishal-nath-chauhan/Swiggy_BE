import { asyncHandler, sendError, sendResponse, STATUS } from "../common/common.helper";
import Dishes from "../models/dishes.schema";



const addDish = asyncHandler(async (req: any, res: any, next: any) => {
    const { code, name, cost_price, sell_price, type, cuisine, image, units, prep_time, restaurant } = req.body;

    if (!code || !name || !cost_price || !type || !cuisine || !sell_price || !image || !units || !prep_time || !restaurant) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', next);

    const isDishExists = await Dishes.findOne({ code }).lean();
    if (isDishExists) return sendError(STATUS.BAD_REQUEST, 'Dish with same details exists.', next)

    const result = (await Dishes.create({ code, name, cost_price, sell_price, type, cuisine, image, units, prep_time, restaurant })).toObject();
    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Add Dish', next)

    return sendResponse(result, res);
});


const deleteDish = asyncHandler(async (req: any, res: any, next: any) => {

    const { id } = req.query;
    const result = await Dishes.findByIdAndDelete(id).lean();

    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Delete Dish', next)
    if (result) sendResponse(result, res);
});


const updateDish = asyncHandler(async (req: any, res: any, next: any) => {

    const { id } = req.query;
    const dataToUpdate = req.body;

    const result = await Dishes.findByIdAndUpdate(id, dataToUpdate, { new: true });

    if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to Update Dish", next)
    return sendResponse(result, res)

});


const getDish = asyncHandler(async (req: any, res: any, next: any) => {
    const { id, code } = req.query;
    let dish;

    if (id) {
        dish = await Dishes.findById(id).lean();
    }
    else {
        dish = await Dishes.findOne({ code }).lean()
    }

    if (!dish) return sendError(STATUS.NOT_FOUND, "No Dish Found", next)
    return sendResponse(dish, res);
});

const getAllDishes = asyncHandler(async (req: any, res: any, next: any) => {
    const dishes = await Dishes.find({}).lean();

    if (!dishes) return sendError(STATUS.NOT_FOUND, "No Dishes Found", next)
    return sendResponse(dishes, res)

});

const index = {
    addDish,
    deleteDish,
    updateDish,
    getDish,
    getAllDishes,
};
export default index;
