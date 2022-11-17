import { isValidObjectId, ObjectId } from "mongoose";
import { isValidMongoDbId, STATUS, sendResponse } from "../common/common.helper";
import Restaurants from "../models/restaurants.schema";





const addRestaurantService = async (data: { name: String, mobile: String, country_code: String, email: String, address: String, pan: String }) => {

    const { name, mobile, country_code, email, address, pan } = data;

    if (!name || !mobile || !email || !address || !pan || !country_code) return { error: true, status: STATUS.BAD_REQUEST, message: "Please send all required fields." }

    const isRestaurantExists = await Restaurants.findOne({ pan }).lean();
    if (isRestaurantExists) return { error: true, status: STATUS.BAD_REQUEST, message: "Restaurant with same PAN exists." }


    const result = (await Restaurants.create(data)).toObject();
    console.log("RESF SESE", result);

    if (!result) return { error: true, status: STATUS.SERVER_ERROR, message: "Failed to Add Restaurant" }

    return { error: false, status: STATUS.SUCCESS, result: result }
}


const deleteRestaurantService = async (data: { id: String }) => {
    const { id } = data;
    if (!id || !isValidMongoDbId(id)) return { error: true, status: STATUS.BAD_REQUEST, message: "Please send valid Id" };

    const result = await Restaurants.findByIdAndDelete(id).lean();
    if (!result) return { error: true, status: STATUS.SERVER_ERROR, message: "Failed to Delete Restaurant" }

    return { error: false, status: STATUS.SUCCESS, result: result }
};


const updateRestaurantService = async (data: { id: String, mobile: String, country_code: String, email: String, }) => {
    const { id, ...dataToUpdate } = data

    console.log("RESFES ", { id, ...dataToUpdate })

    if (!id || !isValidMongoDbId(id)) return { error: true, status: STATUS.BAD_REQUEST, message: "Please send valid Id" }
    const result = await Restaurants.findByIdAndUpdate(id, dataToUpdate, { new: true });
    console.log("res  ", result);

    if (!result) return { error: true, status: STATUS.SERVER_ERROR, message: "Failed to Update Restaurant" }
    return { error: false, status: STATUS.SUCCESS, result: result }
};

const getRestaurantService = async (data: { id: String, name: String, email: String, mobile: String }) => {

    const { id, ...filter } = data;
    let result;
    if (id) {
        result = (await Restaurants.findById(id))?.toObject()

    }
    if (!id) {
        result = await Restaurants.find(filter).lean()
    }
    if (!result) return { error: true, status: STATUS.SERVER_ERROR, message: "Failed to Get Restaurant" }
    return { error: false, status: STATUS.SUCCESS, result: result }

};


const getAllRestaurantService = (data: Object) => { };
const loginRestaurantService = (data: Object) => { };

const restaurantService = { addRestaurantService, deleteRestaurantService, updateRestaurantService, getRestaurantService, getAllRestaurantService, loginRestaurantService };
export default restaurantService;
