import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FbUser } from '../models/fbUser.model';
require('dotenv').config();

const clientID = process.env.FACEBOOK_CLIENT_ID;
const clientSecret = process.env.FACEBOOK_SECRET_KEY;
const callbackURL = process.env.FACEBOOK_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
    throw new Error("Missing Facebook OAuth environment variables");
}

passport.use(
    new FacebookStrategy(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        async (accessToken: string, refreshToken: string, profile: any, cb: Function) => {
            try {
                let user = await FbUser.findOne({
                    accountId: profile.id,
                    provider: 'facebook',
                });

                if (!user) {
                    console.log('Adding new facebook user to DB..');
                    user = new FbUser({
                        accountId: profile.id,
                        name: profile.displayName,
                        provider: profile.provider,
                    });
                    await user.save();
                } else {
                    console.log('Facebook User already exists in DB..');
                }

                return cb(null, profile);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

export default passport;
