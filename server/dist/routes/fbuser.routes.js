"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/fbuser.routes.ts
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../utils/passport"));
const fbUser_controller_1 = require("../controllers/fbUser.controller");
const router = express_1.default.Router();
router.get('/', passport_1.default.authenticate('facebook', { scope: ['email'] }));
router.get('/callback', passport_1.default.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
}), (req, res) => {
    res.redirect('/auth/facebook/success');
});
router.get('/success', fbUser_controller_1.authSuccess);
router.get('/error', fbUser_controller_1.authError);
router.get('/signout', fbUser_controller_1.signOut);
exports.default = router;
