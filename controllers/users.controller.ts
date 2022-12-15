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
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'


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


const signUpUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { email, password, name, country_code, mobile } = req.body;
    console.log({ email, password, name, country_code, mobile });


    const isUserExists = await Users.findOne({ email });
    // if (isUserExists) return sendError(STATUS.BAD_REQUEST, "This user already exists", next)


    const encrytedPassword = await bcrypt.hash(password, 10);

    const response = (await Users.create({
        email,
        password: encrytedPassword,
        name, country_code, mobile
    })).toObject();

    console.log(response)

    const id = response?._id;
    delete response._id;
    delete response.__v;

    const secret = String(process.env.JWT_SECRET)
    const jwtToken = jwt.sign({  id: response._id }, secret, { expiresIn: "1d" })


    return sendResponse({ user: response, token: jwtToken }, res)

});

const loginUser = asyncHandler(async (req: any, res: any, next: any) => {

    const { email, password } = req.body;

    const isUserExists = await Users.findOne({ email }).lean();
    if (!isUserExists) return sendError(STATUS.BAD_REQUEST, "This user does not exists", next)

    const verified = await bcrypt.compare(password, isUserExists.password)
    console.log("VERTIED  ", verified);

    if (verified) {

        const secret = String(process.env.JWT_SECRET)
        const { _id, __v, ...user } = isUserExists;
        const id = _id;
        // delete isUserExists?._id;
        // delete isUserExists.__v;
        const jwtToken = jwt.sign({ id }, secret, { expiresIn: "1d" })


        return sendResponse({ user: { id, ...user }, token: jwtToken }, res)
    }


    console.log('USER  EXISTST ', isUserExists)



});


const verifyJWT = asyncHandler(async (req: any, res: any, next: any) => {

    const { authorization } = req.headers;
    if (!authorization) return sendError(STATUS.NOT_AUTHORIZED, "You must be loggedIn ", next)

    const token = authorization.split("Bearer ")[1]
    const secret = String(process.env.JWT_SECRET)

    const isVerified = await jwt.verify(token, secret)
    if (isVerified) next()
});


const index = {
    addUser,
    deleteUser,
    updateUser,
    getUser,
    getAllUsers,
    loginUser,
    signUpUser,
    verifyJWT
};
export default index;
