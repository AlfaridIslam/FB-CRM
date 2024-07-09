import { ApiError } from "../utils/ApiErrors";
import { asyncHandler } from "../utils/asyncHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

interface DecodedToken extends JwtPayload {
    _id: string;
}

export const verifyJWT = asyncHandler(async (req: any, _: any, next: any) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new ApiError(500, "Server error: missing token secret");
        }

        const decodedToken = jwt.verify(token, secret) as DecodedToken;

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error: any) {
        throw new ApiError(401, error.message || "Invalid access token");
    }
});
