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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const ApiErrors_1 = require("../utils/ApiErrors");
const asyncHandlers_1 = require("../utils/asyncHandlers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
exports.verifyJWT = (0, asyncHandlers_1.asyncHandler)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            throw new ApiErrors_1.ApiError(401, "Unauthorized request");
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new ApiErrors_1.ApiError(500, "Server error: missing token secret");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiErrors_1.ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiErrors_1.ApiError(401, error.message || "Invalid access token");
    }
}));
