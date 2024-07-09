"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const fbuser_routes_1 = __importDefault(require("./routes/fbuser.routes"));
const passport_1 = __importDefault(require("./utils/passport"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '16kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '16kb' }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({ secret: 'mysecret!!!!', resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/v1/users', user_routes_1.default); // Correct base path
app.use('/api/v1/fbusers', fbuser_routes_1.default);
