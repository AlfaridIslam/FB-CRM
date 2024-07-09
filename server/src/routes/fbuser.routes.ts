import express from 'express';
import passport from '../utils/passport';
import { authSuccess, authError, signOut } from '../controllers/fbUser.controller';

const router = express.Router();

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
    '/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook/error',
    }),
    (req, res) => {
        res.redirect('/auth/facebook/success');
    }
);

router.get('/success', authSuccess);
router.get('/error', authError);
router.get('/signout', signOut);

export default router;
