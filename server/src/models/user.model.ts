import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Define an interface for the user schema methods
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
    const secret = process.env.ACCESS_TOKEN_SECRET || "defaultSecret";
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        secret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function (): string {
    const secret = process.env.REFRESH_TOKEN_SECRET || "defaultSecret";
    return jwt.sign(
        {
            _id: this._id,
        },
        secret,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Create and export the User model and IUser interface
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { User, IUser };
