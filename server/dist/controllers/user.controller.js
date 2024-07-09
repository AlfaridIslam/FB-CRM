"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const ApiErrors_1 = require("../utils/ApiErrors");
const asyncHandlers_1 = require("../utils/asyncHandlers");
const generateAccessAndRefereshTokens_1 = require("../utils/generateAccessAndRefereshTokens");
const ApiResponse_1 = require("../utils/ApiResponse");
// Register user
const registerUser = (0, asyncHandlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get user details from frontend 
    const { username, email, password } = req.body;
    console.log(email, password);
    // validation - not empty
    if ([username, email, password].some((field) => (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
        throw new ApiErrors_1.ApiError(400, "All fields are required");
    }
    // check if user already exists: username or email or both 
    const existedUser = yield user_model_1.User.findOne({
        $or: [{ username }, { email }] //used operators
    });
    if (existedUser) {
        throw new ApiErrors_1.ApiError(409, "User with username or email already exist");
    }
    // create user object - create entry in db
    const user = yield user_model_1.User.create({
        username: username.toLowerCase(),
        email,
        password
    });
    // remove password and refresh token field from res 
    const createdUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    // check for user creation
    if (!createdUser) {
        throw new ApiErrors_1.ApiError(500, "Something went wrong while registering user");
    }
    // return res
    return res.status(201).json(new ApiResponse_1.ApiResponse(200, createdUser, "User registered successfully"));
}));
exports.registerUser = registerUser;
// login user
const loginUser = (0, asyncHandlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req body -> data
    const { username, email, password } = req.body;
    // username or email
    if (!(email || username)) {
        throw new ApiErrors_1.ApiError(400, "Username and email is required ");
    }
    // find user
    const user = yield user_model_1.User.findOne({
        $or: [{ email }, { username }]
    });
    if (!user) {
        throw new ApiErrors_1.ApiError(404, "user doesn't exist");
    }
    // password check
    const isPasswordValid = yield user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiErrors_1.ApiError(401, "entered password is wrong");
    }
    // access token & refresh token
    const { accessToken, refreshToken } = yield (0, generateAccessAndRefereshTokens_1.generateAccessAndRefereshTokens)(user._id);
    const loggedUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true
    };
    // send cookie
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse_1.ApiResponse(200, {
        user: loggedUser, refreshToken, accessToken
    }, "User logged in successfully"));
}));
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandlers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        },
    }, {
        new: true
    });
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse_1.ApiResponse(200, {}, "user logged out"));
}));
exports.logoutUser = logoutUser;
