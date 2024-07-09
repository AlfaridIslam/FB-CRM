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
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const fbUser_model_1 = require("../models/fbUser.model");
require('dotenv').config();
const clientID = process.env.FACEBOOK_CLIENT_ID;
const clientSecret = process.env.FACEBOOK_SECRET_KEY;
const callbackURL = process.env.FACEBOOK_CALLBACK_URL;
if (!clientID || !clientSecret || !callbackURL) {
    throw new Error("Missing Facebook OAuth environment variables");
}
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID,
    clientSecret,
    callbackURL,
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield fbUser_model_1.FbUser.findOne({
            accountId: profile.id,
            provider: 'facebook',
        });
        if (!user) {
            console.log('Adding new facebook user to DB..');
            user = new fbUser_model_1.FbUser({
                accountId: profile.id,
                name: profile.displayName,
                provider: profile.provider,
            });
            yield user.save();
        }
        else {
            console.log('Facebook User already exists in DB..');
        }
        return cb(null, profile);
    }
    catch (err) {
        return cb(err, null);
    }
})));
exports.default = passport_1.default;
