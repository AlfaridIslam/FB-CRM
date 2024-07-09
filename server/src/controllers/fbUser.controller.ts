import { Request, Response, RequestHandler } from 'express';
import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        passport: {
            user: {
                id: string;
                displayName: string;
                provider: string;
            };
        };
    }
}


// Your authSuccess handler
export const authSuccess: RequestHandler = (req, res) => {
    if (req.session?.passport) {
        const userInfo = {
            id: req.session.passport.user.id,
            displayName: req.session.passport.user.displayName,
            provider: req.session.passport.user.provider,
        };
        res.render('fb-github-success', { user: userInfo });
    } else {
        res.redirect('/auth/facebook/error');
    }
};

export const authError: RequestHandler = (req, res) => res.send('Error logging in via Facebook.');

export const signOut: RequestHandler = (req, res) => {
    try {
        req.session?.destroy((err: Error) => {
            if (err) {
                console.log('Failed to destroy session:', err);
                res.status(500).send('Failed to sign out Facebook user');
            } else {
                console.log('Session destroyed.');
                res.clearCookie('connect.sid');
                res.redirect('/');
            }
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out Facebook user' });
    }
};
