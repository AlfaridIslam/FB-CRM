"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const connections_1 = __importDefault(require("./db/connections"));
const app_1 = require("./app");
dotenv_1.default.config({
    path: './.env',
});
(0, connections_1.default)()
    .then(() => {
    app_1.app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log('MONGO db connection failed !!! ', err);
});
