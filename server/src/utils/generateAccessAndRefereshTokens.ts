
import { ApiError } from "./ApiErrors";

import { User, IUser } from "../models/user.model";

const generateAccessAndRefereshTokens:any = async (userId: string) => {
    try {
        const user: any = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")

    }
};

export {
    generateAccessAndRefereshTokens
};
