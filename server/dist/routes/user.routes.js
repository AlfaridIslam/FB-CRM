"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.route("/register").post(user_controller_1.registerUser);
router.route("/login").post(user_controller_1.loginUser);
router.route("/logout").post(auth_middleware_1.verifyJWT, user_controller_1.logoutUser);
exports.default = router;
