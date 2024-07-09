import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiErrors";
import { asyncHandler } from "../utils/asyncHandlers";
import { generateAccessAndRefereshTokens } from "../utils/generateAccessAndRefereshTokens";
import { ApiResponse } from "../utils/ApiResponse";

// Register user
const registerUser = asyncHandler(async (req: any, res: any) => {

    // get user details from frontend 
    const { username, email, password } = req.body;
    console.log(email, password)
    // validation - not empty
    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check if user already exists: username or email or both 
    const existedUser: any = await User.findOne({
        $or: [{ username }, { email }]  //used operators
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exist")
    }
    // create user object - create entry in db

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })
    // remove password and refresh token field from res 

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    // check for user creation

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }
    // return res

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

});

// login user
const loginUser = asyncHandler(async (req: any, res: any) => {
    // req body -> data
    const { username, email, password } = req.body;

    // username or email
    if (!(email || username)) {
        throw new ApiError(400, "Username and email is required ")
    }

    // find user
    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(404, "user doesn't exist")
    }

    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "entered password is wrong")
    }

    // access token & refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    // send cookie

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, refreshToken, accessToken
                },
                "User logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req: any, res: any) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
            new: true
        },
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))
})

export {
    registerUser,
    loginUser,
    logoutUser
};
