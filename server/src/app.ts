import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import fbuserRoutes from "./routes/fbuser.routes"

// creating server
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

app.use("/api/v1/users", userRouter); // Correct base path
app.use("/api/v1/fbusers", fbuserRoutes);

// routes declaration 

export { app };
