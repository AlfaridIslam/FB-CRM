import { Request, Response, RequestHandler } from 'express';

export const authSuccess: RequestHandler = (req, res) => {
    if (req.session && req.session.passport) {
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

export const authError: RequestHandler = (req, res) => res.send('Error logging in via Facebook..');

export const signOut: RequestHandler = (req, res) => {
    try {
        req.session?.destroy((err: Error) => {
            if (err) {
                console.log('Failed to destroy session:', err);
                res.status(500).send('Failed to sign out fb user');
            } else {
                console.log('Session destroyed.');
                res.render('auth');
            }
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out fb user' });
    }
};
