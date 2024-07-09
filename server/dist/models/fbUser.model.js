"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FbUser = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    facebookId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    middleName: String,
    birthday: Date,
    gender: String,
    link: String,
    location: {
        id: String,
        name: String
    },
    hometown: {
        id: String,
        name: String
    },
    picture: {
        data: {
            height: Number,
            is_silhouette: Boolean,
            url: String,
            width: Number
        }
    },
    friends: {
        summary: {
            total_count: Number
        }
    },
    posts: [{
            id: String,
            created_time: Date,
            message: String,
            story: String
        }],
    about: String,
    ageRange: {
        min: Number,
        max: Number
    },
    locale: String,
    timezone: Number,
    updatedTime: Date,
    verified: Boolean,
    work: [{
            employer: {
                id: String,
                name: String
            },
            location: {
                id: String,
                name: String
            },
            position: {
                id: String,
                name: String
            },
            start_date: String,
            end_date: String
        }],
    education: [{
            school: {
                id: String,
                name: String
            },
            type: String,
            year: {
                id: String,
                name: String
            },
            concentration: [{
                    id: String,
                    name: String
                }]
        }],
    website: String,
    languages: [{
            id: String,
            name: String
        }],
    cover: {
        id: String,
        offset_x: Number,
        offset_y: Number,
        source: String
    }
}, { timestamps: true });
// Create and export the User model and IUser interface
const FbUser = mongoose_1.default.model("FbUser", userSchema);
exports.FbUser = FbUser;
