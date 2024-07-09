import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes';
import fbuserRoutes from './routes/fbuser.routes';
import passport from './utils/passport';
import session from 'express-session';

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({ secret: 'mysecret!!!!', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/users', userRouter); // Correct base path
app.use('/api/v1/fbusers', fbuserRoutes);

export { app };
