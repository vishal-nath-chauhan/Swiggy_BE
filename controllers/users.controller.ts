// name: { type: String, required: true, maxLength: 80 },
// 	mobile: {
// 		type: String,
// 		required: true,
// 		minLength: 10,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		minLength: 3,
// 	},
// 	address: {
// 		type: Array,
// 		required: true,
// 		minLength: 10,
// 	},

import { asyncHandler, sendError, sendResponse, STATUS } from "../common/common.helper";
import Users from "../models/users.schema";

const addUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { name, mobile, email, address, country_code } = req.body;

    if (!name || !mobile || !email || !address || !country_code) return sendError(STATUS.BAD_REQUEST, 'Please send all required fields.', res);

    const isUserExists = await Users.findOne({ email }).lean();
    if (isUserExists) return sendError(STATUS.BAD_REQUEST, 'User with same details exists.', next)

    const result = (await Users.create({ name, mobile, country_code, email, address })).toObject();
    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Add User', next)

    return sendResponse(result, res);

});
const deleteUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { id } = req.query;
    const result = await Users.findByIdAndDelete(id).lean();

    if (!result) return sendError(STATUS.SERVER_ERROR, 'Failed to Delete User', next)
    if (result) sendResponse(result, res);
});
const updateUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { id } = req.query;
    const dataToUpdate = req.body;

    const result = await Users.findByIdAndUpdate(id, dataToUpdate, { new: true });

    if (!result) return sendError(STATUS.SERVER_ERROR, "Failed to Update User", next)
    return sendResponse(result, res)

});
const getUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { id } = req.query;
    const user = await Users.findById(id).lean();

    if (!user) return sendError(STATUS.NOT_FOUND, "No User Found", next)
    return sendResponse(user, res);

});
const getAllUsers = asyncHandler(async (req: any, res: any, next: any) => {



    const users = await Users.find({}).lean();

    if (!users) return sendError(STATUS.NOT_FOUND, "No Users Found", next)
    return sendResponse(users, res)

});

const loginUser = asyncHandler(async (req: any, res: any, next: any) => { });

const index = {
    addUser,
    deleteUser,
    updateUser,
    getUser,
    getAllUsers,
    loginUser,
};
export default index;
